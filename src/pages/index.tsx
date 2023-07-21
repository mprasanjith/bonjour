import React from "react";
import { motion } from "framer-motion";
import {
  createStyles,
  Container,
  Text,
  Button,
  Group,
  rem,
} from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: "relative",
    paddingTop: rem(200),
    paddingBottom: rem(120),

    [theme.fn.smallerThan("sm")]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),

    [theme.fn.smallerThan("sm")]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },
}));

const pieEmojiAnimation = {
  y: [0, -20, 0], // Bounce up and down by 20 pixels
  transition: {
    repeat: Infinity, // Repeat the animation infinitely
    duration: 1, // Each animation cycle takes 1 second
  },
};

export function BouncingPieEmoji() {
  return (
    <motion.span
      animate={pieEmojiAnimation}
      style={{ display: "inline-block" }}
    >
      🥧
    </motion.span>
  );
}

export function ShakingMoneyEmoji() {
  const moneyEmojiAnimation = {
    rotate: [-10, 10, -10], // Rotate left and right
    transition: {
      repeat: Infinity, // Repeat the animation infinitely
      duration: 1, // Each animation cycle takes 1 second
    },
  };

  return (
    <motion.span
      animate={moneyEmojiAnimation}
      style={{ display: "inline-block" }}
    >
      🤑
    </motion.span>
  );
}

export function Landing() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          <ShakingMoneyEmoji />{" "}
          <Text component="span" variant="gradient" inherit>
            Crypto
          </Text>{" "}
          made
          <br />
          as easy as <BouncingPieEmoji /> pie.
        </h1>
        <Text className={classes.description} color="dimmed">
          We simplify crypto for everyone, while keeping it safe and secure. Own
          your crypto the easy way.
        </Text>
        <Group className={classes.controls}>
          <Link href="/onboard">
            <Button size="xl" className={classes.control} variant="gradient">
              Get started
            </Button>
          </Link>
        </Group>
      </Container>
    </div>
  );
}

export default Landing;
