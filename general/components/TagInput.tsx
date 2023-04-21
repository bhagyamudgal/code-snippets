import { KeyboardEvent, useEffect, useRef, useState } from "react";

// chakra-ui
import { Box, Flex, Input } from "@chakra-ui/react";

// components
import { showInfoToast } from "../NotificationToast";

interface Props {
    id: string;
    placeholder: string;
    tagsCallback: (tags: string[] | null) => void;
}

function TagInput({ id, placeholder, tagsCallback }: Props) {
    const [tags, setTags] = useState<string[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (tags?.length > 0) {
            tagsCallback(tags);
        } else {
            tagsCallback(null);
        }
    }, [tags]); //eslint-disable-line

    const tagsHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (inputRef.current) {
            const value = inputRef.current.value?.trim();

            if (value) {
                if (e.key === "Enter") {
                    if (!tags.includes(value)) {
                        setTags([...tags, value]);
                        inputRef.current.value = "";
                    } else {
                        showInfoToast({
                            id: "tag-exists",
                            message: "Tag already exists",
                        });
                    }
                }
            } else {
                if (e.key === "Backspace") {
                    if (tags.length !== 0) {
                        setTags(tags.slice(0, -1));
                    }
                }
            }
        }
    };

    return (
        <Flex
            id={id}
            bg="white"
            border="1px"
            borderColor="gray.300"
            rounded="md"
            _hover={{ borderColor: "gray.500" }}
            _focusWithin={{ border: "2px", borderColor: "blue.500" }}
            p={tags?.length > 0 ? 0 : 2}
        >
            {tags?.map((tag) => {
                return (
                    <Box
                        key={tag}
                        py={1}
                        px={2}
                        m={1}
                        bg="primary.400"
                        rounded="md"
                        color="white"
                    >
                        {tag}
                    </Box>
                );
            })}

            <Input
                px={2}
                ref={inputRef}
                variant="unstyled"
                placeholder={placeholder}
                onKeyDown={tagsHandler}
            />
        </Flex>
    );
}

export default TagInput;
