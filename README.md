[//]: # (<div style="width: 100%;">)

[//]: # (  <img src="./.github/index.svg" style="width: 100%;" alt="Click to see the source">)

[//]: # (</div>)

# 🎞️ shaka-player-thumbnails

A highly customizable thumbnail plugin for [Shaka Player](https://github.com/shaka-project/shaka-player) and **other video player libraries!**

**Features:**
- 🌐 **Cross-Player Support**: Fully compatible with other player libraries. Simply specify the `seekBarId` in the configuration to integrate seamlessly.
- 🖼️ **Thumbnail Previews**: Display thumbnails on the seek bar for better navigation.
- 🎛️ **Customizable**: Easily adjust the size, position, styles, and intervals of thumbnails.
- ⏰ **Time Tooltip**: Optionally show timestamps under thumbnails.
- 📱 **Mobile-Friendly**: Optimized for mobile browsers.

---

## 🚀 Installation

Install the plugin via npm:

```bash
npm install shaka-player-thumbnails
```

##  📖 Usage
#### JavaScript / TypeScript

```ts
import Thumbnails from 'shaka-player-thumbnails';

const thumbnailsPlugin = new Thumbnails(
    video: HTMLVideoElement; 
    options: IOptions;
)
```
####  Interface of options
```ts
interface IOptions {
    columns: number; // Number of columns in the sprite sheet
    rows: number; // Number of rows in the sprite sheet
    interval?: string; // Interval between thumbnails in the sprite (e.g., "10s")
    thumbnails: string[]; // Array of sprite image URLs
    top?: number; // Thumbnail position offset (default: 120px)
    scale?: number; // Thumbnail size multiplier (default: 1)
    styles?: Object; // Custom styles in camelCase format
    timeTooltip?: boolean; // Enable/disable time tooltips (default: true)
    seekBarId?: string; // Custom seek bar selector (e.g., "#custom-seekbar", ".custom-seekbar")
}
```
#### Initialize plugin after you stream is loaded
```ts
thumbnailsPlugin.initialize();
```
##  💡 Example Integration
```ts
import shaka from 'shaka-player/dist/shaka-player.ui';
import Thumbnails from 'shaka-player-thumbnails';

if (shaka.Player.isBrowserSupported()) {
    initPlayer();
} else {
    console.error('Browser not supported!');
}

const initPlayer = async () => {
    const video = document.getElementById('video');
    const player = new shaka.Player(video);

    const thumbnailsPlugin = new Thumbnails(video, {
        columns: 5,
        rows: 5,
        thumbnails: ['/sprite_1.jpg','/sprite_2.jpg'],
        styles: {
            border: '1px solid #fff',
            borderRadius: '7px',
        }
    });
    
    try {
        await player.load(manifestUri);
        thumbnailsPlugin.initialize();
    } catch (e) {
        console.error(e)
    }
}
```

## 📜 License
Released under [MIT](https://github.com/Lelouchwe/shaka-player-thumbnails/blob/master/LICENSE) by [lelouchwe](https://github.com/Lelouchwe).
## 🛠️ Contributing

Contributions are welcome! If you find bugs or have feature requests, feel free to open an issue or submit a pull request.

📬 Author

Developed with ❤️ by [lelouchwe](https://github.com/Lelouchwe).
