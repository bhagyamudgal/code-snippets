import { shortenWalletAddress } from "@/utils/solana";
import { Button } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function ConnectWalletButton() {
    const { connected, publicKey } = useWallet();

    return (
        <Button
            colorScheme="blue"
            as={WalletMultiButton}
            _hover={{ bgColor: "blue.600 !important" }}
        >
            {connected
                ? publicKey?.toString() &&
                  shortenWalletAddress(publicKey.toString())
                : "Connect Wallet"}
        </Button>
    );
}

export default ConnectWalletButton;
