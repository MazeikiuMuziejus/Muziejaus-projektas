import { useState } from "react";
import FastImage from "react-native-fast-image";
import { Blurhash } from "react-native-blurhash";

export interface IImageWithBlurhashProps {
    image: string;
    blurhash: string;
    style?: any;
    loading?: boolean;
    blurhashStyle?: any;
}

export default function ImageWithBlurhash({image, blurhash, style, blurhashStyle}: IImageWithBlurhashProps){
    const [imageLoading, setImageLoading] = useState(true);
    return (
        <>
            {imageLoading && (
                <Blurhash
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        ...blurhashStyle,
                    }}
                    blurhash={blurhash}
                />
            )}
            <FastImage
                style={{
                    width: '100%',
                    height: '100%',
                    ...style,
                }}
                source={{uri: image}}
                resizeMode={FastImage.resizeMode.cover}
                onLoadEnd={() => setImageLoading(false)}
            />
        </>
    )
}