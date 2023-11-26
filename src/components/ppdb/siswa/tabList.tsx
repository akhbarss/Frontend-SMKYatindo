/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Tabs, Text, useMantineTheme } from "@mantine/core";
import { IconType } from "react-icons";
import { BiLock } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";

const TabList = ({
  card,
  activeTabIndex,
}: {
  card: {
    label: string;
    icon: IconType;
    index: number;
    is_done: boolean;
  }[];
  activeTabIndex: number;
}) => {
  const theme = useMantineTheme();

  return (
    <Tabs.List
      sx={{
        display: "flex",
        gap: "1rem",
        padding: "2rem 0 1rem",
      }}
    >
      {card &&
        card.length > 0 &&
        card.map((item, i) => (
          <Tabs.Tab
            key={i}
            sx={() => ({
              flex: 1,
              minWidth: 250,
            })}
            h={"10rem"}
            value={item.index.toString()}
            disabled={
              // @ts-ignore
              card[i > 0 ? i - 1 : i].is_done == 0 || item.is_done === 0
            }
            style={{ position: "relative" }}
          >
            {!item.is_done &&
              // @ts-ignore
              card[i > 0 ? i - 1 : i].is_done == 0 &&
              activeTabIndex !== item.index && (
                <div
                  style={{
                    position: "absolute",
                    top: -15,
                    right: 10,
                    cursor: "not-allowed",
                    backgroundColor: `${theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[4]
                      }`,
                    borderRadius: "100px",
                    padding: "5px",
                  }}
                >
                  <BiLock size={25} />
                </div>
              )}

            {item.is_done && (
              <div
                style={{
                  position: "absolute",
                  top: -15,
                  right: 10,
                  cursor: "not-allowed",
                  backgroundColor: `${theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : "white"
                    }`,
                  borderRadius: "100%",
                  padding: "4px",
                  color: "#51CF66",
                  border: ``,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <BsCheckCircleFill size={25} />
              </div>
            )}

            <Box sx={{ marginInline: "auto", width: "fit-content" }}>
              {item.icon && <item.icon size={70} />}
            </Box>

            <Text
              weight={"bolder"}
              mt={10}
              sx={{
                textAlign: "center",
              }}
            >
              {item.label}
            </Text>
          </Tabs.Tab>
        ))}
    </Tabs.List>
  );
};

export default TabList;
