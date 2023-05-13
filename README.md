<div style="background-color: rgba(0,0,0,0.3); width: 100%; min-height: 100px; border-radius: 10px;  margin: 0 auto;">
    <h1 style="text-align: center; color: white; letter-spacing: 2px">Shaka-Player Thumbnails</h1>
    <h3 style="text-align: center; padding-bottom: 20px">Creating a thumbnail when hovering on a seakbar</h3>
</div>

>  A customized thumbnails plugin for [shaka-player](https://github.com/shaka-project/shaka-player)
> 
> Compatible with mobile browsers
> 
> Customized thumbnail and time tooltip

## install

```bash
 npm install shaka-player-thumbnails
```

##  Usage
<summary>JavaScript / TypeScript</summary>

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
    columns: number; // count columns in sprite
    rows: number; // count rows in sprite
    thumbnails: string[]; // array of thumbnails
    top?: number; // you can control position of thumbnail (default: 120)
    scale?: number; // multiplier size of thumbnail (default: 1)
    styles?: Object; // accept object of styles, you can write them in camelcase style
    timeTooltip?: boolean; // show time under thumbnail (default: true)
}
```
#### Initialize plugin after you stream is loaded
```ts
thumbnailsPlugin.initialize();
```
##  Example
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

## License

Released under [MIT](https://github.com/Lelouchwe/shaka-player-thumbnails/blob/master/LICENSE) by [lelouchwe](https://github.com/Lelouchwe).
