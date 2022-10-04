import { Box } from "@chakra-ui/react";

const Fallback = () => {
    return (
        <>
            <Box display={"flex"} flexDirection={'column'} pos="fixed" top={0} left={0} right={0} bottom={0} w="100%" h={"100vh"} zIndex={50} alignItems="center" justifyContent={"center"} overflow={"hidden"} opacity={"75%"} bg={"gray.700"}>
                <Box className="loader" w={12} h={12} border={4} borderStyle={"solid"} borderColor={"gray.200"} borderRadius={"full"} borderTopColor={"black"} alignItems="center" justifyContent={"center"} overflow={"hidden"} opacity={"75%"}></Box>
            </Box>
        </>
    );
};

export default Fallback;
