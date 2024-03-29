import {
    Avatar,
    Skeleton
} from "@mantine/core";
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { convertToFileObject } from '../../utils/imageUtils';
import { openModalImage } from '../../utils/openModalImage';

const ProfilePicture = ({ img }: { img: string }) => {
    const [image, setImg] = useState<File[] | null>(null)
    const [load, setLoad] = useState(false)

    const setValue = useCallback(async () => {
        setLoad(true)
        try {
            const data = await convertToFileObject(img)
            setLoad(false)
            setImg(data)
        } catch (error) {
            setLoad(false)
            toast.error("Gagal mmengambil foto profil")
        }
    }, [img])

    useEffect((() => {
        if (img) {
            setValue()
        }
    }), [img, setValue])

    return (
        <>
            {
                load ? <Skeleton circle height={200} /> : image?.length > 0 && image.map((file, index) => {
                    const imageUrl = URL.createObjectURL(file);
                    return (
                        <Avatar
                            key={index}
                            src={imageUrl}
                            imageProps={{
                                onLoad: () => URL.revokeObjectURL(imageUrl),
                            }}
                            size={220}
                            color="cyan"
                            sx={{ border: "3px solid grey", cursor: "pointer" }}
                            radius={"100%"}
                            onClick={() => openModalImage(file.name)}
                        />
                    )
                })

            }
        </>
    )
}

export default ProfilePicture