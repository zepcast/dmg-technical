# DMG Read More - WordPress Plugin

- Adds a new "DMG Read More" block that allows the user to link to any post in the site.
- Adds a new WP_CLI command that allows the user to find all posts using the above block.

## Requirements

- **PHP**: 8.3 or higher
- **WordPress**: Latest stable version
- **Node.js**: 18.x or higher (for building assets)
- **Composer**: For PHP dependency management (optional)
- **pnpm**: 10.17.1 (as specified in package.json)

## Installation

### Method 1: Manual Installation

1. Download or clone this repository into your WordPress plugins directory:
   ```bash
   cd wp-content/plugins/
   git clone <repository-url> gc-read-more
   cd gc-read-more
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install JavaScript dependencies:
   ```bash
   pnpm install
   ```

4. Build the plugin assets:
   ```bash
   pnpm run build
   ```

5. Activate the plugin through the WordPress admin panel


## Usage

## Adding the Block

1. In the WordPress editor, click the "+" button to add a new block
2. Search for "DMG Read More" or find it under the "Widgets" category

### Selecting a Post

1. Click on the block in the editor
2. In the block settings panel (right sidebar):
   - **Selected Post**: View or change the currently selected post
   - **Search Options**: Choose to search by Title or ID
   - **Post List**: Browse all posts with pagination
3. Click on any post to select it

### Block Features

- **Search by Title**: Type to filter posts by title
- **Search by ID**: Enter a specific post ID
- **Pagination**: Navigate through multiple pages of posts
- **Quick Actions**:
  - Edit icon: Opens the post in the editor
  - View icon: Opens the post on the frontend

## Using the WP_CLI Command

### Options

`[--date-after=]`

Limit results to posts published on or after this date.
Accepts any valid date format (e.g. "2025-01-01").

`[--date-before=]`

Limit results to posts published on or before this date.
Accepts any valid date format (e.g. "2025-12-31").

`[--fast]`

Use direct SQL query for better performance on large databases.
Recommended for databases with millions of posts.

###Examples

Search posts from the past 30 days (standard search).

`$ wp dmg-read-more`

Search posts between specific dates.

`$ wp dmg-read-more --date-after=2025-01-01 --date-before=2025-02-01`

Search posts from the past 30 days using SQL for better performance on larger databases.

`$ wp dmg-read-more --fast`

## Author

**Giuseppe Castiglione**

Email: hi@zepcast.uk
