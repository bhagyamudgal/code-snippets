import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";

const NoSSR = (props: any) => {
    props.children;
};

export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false,
});
