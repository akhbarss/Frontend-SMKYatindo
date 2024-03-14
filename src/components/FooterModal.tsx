import { Button, Group } from "@mantine/core";

type FooterModalProps = {
  loading: boolean;
  onClose: () => void;
  label: string;
};

const FooterModal = ({ label, loading, onClose }: FooterModalProps) => {
  return (
    <Group
      position="right"
      sx={(theme) => ({
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        padding: "1rem 4rem",
        backgroundColor: theme.colorScheme === "dark" ? "black" : "whitesmoke",
        zIndex: 1,
      })}
    >
      <Button
        variant="outline"
        onClick={() => {
          onClose();
        }}
        disabled={loading}
      >
        Batal
      </Button>

      <Button type="submit" loading={loading}>
        {label}
      </Button>
    </Group>
  );
};

export default FooterModal;
