import { Paper, Text } from '@mantine/core'

const DataKosong = ({ message }: { message: string }) => {
    return (
        <Paper withBorder p={"lg"} shadow="lg" sx={theme => ({ backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : "" })}>
            <Text size={"lg"} weight={"bold"}>{message}</Text>
        </Paper>
    )
}

export default DataKosong