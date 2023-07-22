import React, { useEffect, useState } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
import { useWeb3Auth } from "@/providers/Web3AuthProvider";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    borderBottom: `${rem(1)} solid ${theme.colors.dark[4]}`,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.fn.lighten(theme.colors.dark[4], 0.1),
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor: theme.fn.lighten(theme.colors.dark[4], 0.1),
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: "transparent",
    borderColor: theme.colors.dark[4],

    "&:hover": {
      color: theme.white,
      backgroundColor: theme.fn.lighten(theme.colors.dark[4], 0.1),
    },

    "&[data-active]": {
      color: theme.white,
      backgroundColor: theme.fn.lighten(theme.colors.dark[4], 0.1),
      borderColor: theme.colors.dark[4],
    },
  },
}));

export const AppNavigation: React.FC = () => {
  const { signOut, user } = useWeb3Auth();
  const router = useRouter();
  const tabs = ["Home", "Explore", "Notifications", "Messages"];

  const { classes, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const signOutAndRedirect = () => {
    signOut();
    router.push("/");
  };

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Text>
            Bonjour, <strong>{user?.name}</strong>!
          </Text>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Avatar
                    src={user?.profileImage}
                    alt={user?.name}
                    radius="xl"
                    size={20}
                  />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {user?.name}
                  </Text>
                  <IconChevronDown size={rem(12)} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                color="red"
                icon={<IconTrash size="0.9rem" stroke={1.5} />}
                onClick={signOutAndRedirect}
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container>
        <Tabs
          defaultValue="Home"
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
};
