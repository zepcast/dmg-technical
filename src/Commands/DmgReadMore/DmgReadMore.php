<?php

namespace GC\Technical\Commands\DmgReadMore;

class DmgReadMore
{
    private array $foundPosts = [];

    private ?string $dateAfter = null;

    private ?string $dateBefore = null;

    /**
     * DMG Read More block CLI command.
     *
     * ## DESCRIPTION
     *
     * Searches published posts for the "Read More" Gutenberg block
     * and outputs their post IDs.
     *
     * ## OPTIONS
     *
     * [--date-after=<date>]
     * : Limit results to posts published on or after this date.
     *   Accepts any valid date format (e.g. "2025-01-01").
     *
     * [--date-before=<date>]
     * : Limit results to posts published on or before this date.
     *   Accepts any valid date format (e.g. "2025-12-31").
     *
     * [--fast]
     * : Use direct SQL query for better performance on large databases.
     *   Recommended for databases with millions of posts.
     *
     * ## EXAMPLES
     *
     *     # Search posts from the past 30 days (standard search).
     *     $ wp dmg-read-more
     *
     *     # Search posts between specific dates (fast search).
     *     $ wp dmg-read-more --fast --date-after=2025-01-01 --date-before=2025-02-01
     *
     *     # Output only post IDs.
     *     42
     *     133
     *     246
     *
     * @when after_wp_load
     */
    public function __invoke(array $args, array $assoc_args): void
    {
        try {
            $this->handleArgs($assoc_args);

            if (!empty($assoc_args['fast'])) {
                $this->findPostsFast();
            } else {
                $this->findPosts();
            }

            $this->handleOutput();
        } catch (\Exception $e) {
            \WP_CLI::error('Error: ' . $e->getMessage());
        }
    }

    /**
     * Standard search using WP_Query with full WordPress integration.
     */
    private function findPosts(): void
    {
        $args = [
            'posts_per_page' => -1,
            'post_type' => 'post',
            'fields' => 'ids',
            's' => '<!-- wp:gc/read-more'
        ];

        // If no dates provided, default to last 30 days
        if (!$this->dateAfter && !$this->dateBefore) {
            $args['date_query'] = [
                [
                    'after' => '30 days ago',
                ],
            ];
        } else {
            $dateQuery = [];

            if ($this->dateAfter) {
                $dateQuery['after'] = $this->dateAfter;
            }

            if ($this->dateBefore) {
                $dateQuery['before'] = $this->dateBefore;
            }

            if (!empty($dateQuery)) {
                $args['date_query'] = [$dateQuery];
            }
        }

        $query = new \WP_Query($args);

        $this->foundPosts = $query->posts;
    }

    /**
     * Fast search using direct SQL for better performance on large databases.
     * Bypasses WordPress filters and hooks for maximum speed.
     */
    private function findPostsFast(): void
    {
        global $wpdb;

        // Build the SQL query based on date parameters
        $sql = "
            SELECT DISTINCT p.ID
            FROM {$wpdb->posts} p
            WHERE p.post_type = 'post'
              AND p.post_status = 'publish'
              AND p.post_content LIKE %s
        ";

        $prepareArgs = ['%<!-- wp:gc/read-more%'];

        // Add date filtering
        if (!$this->dateAfter && !$this->dateBefore) {
            // Default to last 30 days
            $sql .= " AND p.post_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)";
        } else {
            if ($this->dateAfter) {
                $sql .= " AND p.post_date >= %s";
                $prepareArgs[] = $this->dateAfter;
            }
            if ($this->dateBefore) {
                $sql .= " AND p.post_date <= %s";
                $prepareArgs[] = $this->dateBefore;
            }
        }

        $sql .= " ORDER BY p.post_date DESC";

        // Prepare and execute the query
        $this->foundPosts = $wpdb->get_col(
            $wpdb->prepare($sql, ...$prepareArgs)
        );
    }

    private function handleOutput(): void
    {
        if (!empty($this->foundPosts)) {
            \WP_CLI::success(count($this->foundPosts) . ' posts found, matching your criteria.');

            foreach ($this->foundPosts as $postId) {
                \WP_CLI::log((string)$postId);
            }
        } else {
            \WP_CLI::log("No posts found matching your criteria.");
        }
    }

    private function handleArgs(array $args): void
    {
        if (isset($args['date-after'])) {
            $this->dateAfter = $args['date-after'];
        }

        if (isset($args['date-before'])) {
            $this->dateBefore = $args['date-before'];
        }
    }
}
