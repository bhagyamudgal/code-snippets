import { Center, Spinner, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
    loadingText?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    color?: string;
}

function LoadingSpinner({
    loadingText,
    size = "xl",
    color = "primary.500",
}: Props) {
    return (
        <Center flexDirection="column" minH="250px">
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color={color}
                size={size}
                mb={3}
            />
            {loadingText && (
                <Text
                    textAlign="center"
                    maxW="280px"
                    color={color}
                    fontFamily="lexend"
                >
                    {loadingText}
                </Text>
            )}
        </Center>
    );
}

export default LoadingSpinner;
