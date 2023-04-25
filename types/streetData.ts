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
                },
                zmones?:[
                    {
                        vardas: string,
                        tekstas: string
                    }
                ]
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