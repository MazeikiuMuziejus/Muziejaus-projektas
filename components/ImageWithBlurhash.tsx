import { useState } from "react";
import FastImage from "react-native-fast-image";
import { Blurhash } from "react-native-blurhash";

export interface IImageWithBlurhashProps {
    image: string;
    blurhash: string;
    style?: any;
    blurhashStyle?: any;
}

export default function ImageWithBlurhash({image, blurhash, style, blurhashStyle}: IImageWithBlurhashProps){
    const [imageLoading, setImageLoading] = useState<boolean>(true);    // Ensures that the blurhash is only shown while the image is loading

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
                    borderRadius: 5,
                    ...blurhashStyle,
                }}
                blurhash={blurhash || 'L5H2EC=PM+yV0g-mq.wG9c010J}I'}   // Show image blurhash or default blurhash
            />
            <FastImage
                style={{
                    width: '100%',
                    height: '100%',
                    ...style,
                }}
                source={{uri: image}}
                resizeMode={FastImage.resizeMode.cover}
                onLoadEnd={() => {setImageLoading(false);}}
            />
        </>
    )
}