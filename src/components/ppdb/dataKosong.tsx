import { Paper, Text } from '@mantine/core'

const DataKosong = () => {
    return (
        <Paper withBorder p={"lg"} shadow="lg" sx={theme => ({backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8]:""})}>
            <Text size={"lg"} weight={"bold"}>Data kosong</Text>
        </Paper>
    )
}

export default DataKosong