# DMG Read More - WordPress Plugin

A custom WordPress block plugin that allows editors to easily create "Read More" links to any post in the site.

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

## Project Structure

```
gc-read-more/
├── src/                          # Source files
│   ├── Admin/                    # Admin-related functionality
│   ├── Blocks/                   # Block definitions
│   │   └── ReadMore/            # Read More block
│   │       ├── Components/      # React components
│   │       ├── block.json       # Block configuration
│   │       ├── Edit.tsx         # Block editor component
│   │       └── render.php       # Server-side rendering
│   ├── Components/               # Shared React components
│   ├── types/                    # TypeScript definitions
│   └── Plugin.php                # Main plugin class
├── build/                        # Compiled assets (generated)
├── gc-technical-task.php        # Plugin main file
├── composer.json                 # PHP dependencies
├── package.json                  # JavaScript dependencies
├── tsconfig.json                # TypeScript configuration
├── webpack.config.js            # Webpack customization
└── README.md                    # This file
```

## Usage

### Adding the Block

1. In the WordPress editor, click the "+" button to add a new block
2. Search for "DMG Read More" or find it under the "Widgets" category
3. The block will appear with a default message

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

### Building

```bash
# Production build
pnpm run build

# Development build with watch mode
pnpm run start
```

### Architecture

- **Plugin**: PSR-4 autoloading structure
- **Blocks**: WordPress Block API (Block API v3)
- **Frontend**: React with TypeScript
- **Styling**: Separate CSS files for editor and frontend
- **Build**: WP Scripts (@wordpress/scripts) with custom webpack config

## Author

**Giuseppe Castiglione**

Email: hi@zepcast.uk
