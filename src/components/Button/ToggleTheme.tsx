import {
    ActionIcon,
    useMantineColorScheme
} from "@mantine/core"
import { FaMoon, FaSun } from 'react-icons/fa'

const ToggleTheme = ({
    color
}: {
    color: string
}) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const dark = colorScheme === "dark"

    return (
        <ActionIcon
            variant="outline"
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
            className={`w-9 h-9 text-[${color}] border border-[${color}]`}
        >
            {dark ? (
                <FaSun size="1.1rem" />
            ) : (
                <FaMoon size="1.1rem" />
            )}
        </ActionIcon>
    )
}

export default ToggleTheme
