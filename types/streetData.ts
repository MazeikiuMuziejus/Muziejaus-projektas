export type streetData = [
    {
        gatve: string,
        data: [
            {
                nr: string,
                tekstas: string,
                coords: {
                    lat: number,
                    long: number
                }
            }
        ],
        initialCoords:{
            lat: number,
            long: number
        },
        images: {
            button: string,
            streets: {
                [key: string]: string[]
            }
        }
    } 
]