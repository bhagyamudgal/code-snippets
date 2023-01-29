import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Image,
    Input,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import ImageEditor from "react-avatar-editor";

interface Props {
    imageCallback: (image: string) => void;
    maxFileSize?: number;
    imageEditorConfig?: {
        width: number;
        height: number;
        border: number;
    };
}

function ImagePicker({
    imageCallback,
    maxFileSize = 2048,
    imageEditorConfig,
}: Props) {
    const [imageEditState, setImageEditState] = useState<
        "Choose Image" | "Edit Image" | "Done"
    >("Choose Image");
    const imageEditorRef = useRef<any>(null);

    const [imageScale, setImageScale] = useState(1);
    const [imageToBeEdit, setImageToBeEdit] = useState<any>(null);
    const [editedImage, setEditedImage] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDone = () => {
        if (imageEditorRef.current) {
            const canvas = imageEditorRef.current.getImageScaledToCanvas();

            const imageDataUrl = canvas.toDataURL();

            setEditedImage(imageDataUrl);

            const imageBase64String = imageDataUrl
                ?.replace("data:", "")
                .replace(/^.+,/, "");

            imageCallback(imageBase64String);

            setImageEditState("Done");
        }
    };

    const handleReset = () => {
        setImageEditState("Choose Image");
        setImageToBeEdit(null);
    };

    if (imageEditState === "Choose Image") {
        return (
            <FormControl isInvalid={error ? true : false}>
                <FormLabel htmlFor="image">Image</FormLabel>
                <Input
                    id="image"
                    type="file"
                    p={1}
                    onChange={(event) => {
                        const file = event?.target?.files?.[0];

                        if (file) {
                            const sizeOfFile = file?.size / 1024;
                            const typeOfFile = file?.type;

                            if (!typeOfFile.includes("image")) {
                                event.target.value = "";
                                setError("Please choose an image file");
                                return;
                            }

                            if (sizeOfFile > maxFileSize) {
                                event.target.value = "";
                                setError(
                                    `Please choose an image file less than ${
                                        maxFileSize / 1024
                                    } MB`
                                );
                                return;
                            }

                            setError(null);

                            setImageEditState("Edit Image");
                            setImageToBeEdit(file);
                        }
                    }}
                />
                <FormErrorMessage>{error ?? ""}</FormErrorMessage>
            </FormControl>
        );
    } else if (imageEditState === "Edit Image" && imageToBeEdit) {
        return (
            <Box bgColor="orange.300" p={5}>
                <ImageEditor
                    image={imageToBeEdit}
                    width={imageEditorConfig?.width ?? 300}
                    height={imageEditorConfig?.height ?? 300}
                    border={imageEditorConfig?.border ?? 20}
                    scale={imageScale}
                    ref={imageEditorRef}
                />

                <Slider
                    my={4}
                    colorScheme="blue"
                    onChange={(value) => {
                        setImageScale(value);
                    }}
                    defaultValue={1}
                    min={1}
                    max={3}
                    step={0.1}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>

                <HStack justifyContent="space-between">
                    <Button colorScheme="red" onClick={handleReset}>
                        Cancel
                    </Button>
                    <Button colorScheme="green" onClick={handleDone}>
                        Done
                    </Button>
                </HStack>
            </Box>
        );
    } else {
        return (
            <Box>
                <Text mb={2} fontWeight="medium" align="center">
                    Image
                </Text>
                <Image src={editedImage} alt="NFT Image" mb={4} />
                <Button colorScheme="pink" onClick={handleReset} w="full">
                    Choose New Image
                </Button>
            </Box>
        );
    }
}

export default ImagePicker;
