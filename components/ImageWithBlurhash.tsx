import { useState } from "react";
import FastImage from "react-native-fast-image";
import { Blurhash } from "react-native-blurhash";

export interface IImageWithBlurhashProps {
    image: string;
    blurhash: string;
    style?: any;
    blurhashStyle?: any;
    timeout?: number;
}

export default function ImageWithBlurhash({image, blurhash, style, blurhashStyle, timeout = 0}: IImageWithBlurhashProps){
    const [imageLoading, setImageLoading] = useState(true);

    return (
        <>
            <Blurhash
                decodeAsync
                resizeMode="cover"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    display: imageLoading ? 'flex' : 'none',    // Only show the blurhash while the image is loading
                    ...blurhashStyle,
                }}
                blurhash={blurhash}
            />
            <FastImage
                style={{
                    width: '100%',
                    height: '100%',
                    ...style,
                }}
                source={{uri: image}}
                resizeMode={FastImage.resizeMode.cover}
                onLoadEnd={() => {
                    setTimeout(() => {   // Wait a bit before showing the image to prevent flickering
                        setImageLoading(false);
                    }, timeout)
                }}
            />
        </>
    )
}