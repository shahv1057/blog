import * as React from "react"
import {
  FaBars,
  FaGithub,
  FaInstagram,
  FaMediumM,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa"
import { css } from "@emotion/core"

export default () => (
  <div
    css={css`
      display: flex;
      flex-direction: row;
    `}
  >
    <a
      href="https://instagram.com/veeral_shah"
      target="blank"
      rel="noopener noreferrer"
      style={{
        borderBottom: "none",
      }}
    >
      <FaInstagram
        style={{
          marginRight: "1em",
        }}
      />
    </a>
    <a
      href="https://github.com/shahv1057"
      target="blank"
      rel="noopener noreferrer"
      style={{
        borderBottom: "none",
      }}
    >
      <FaGithub
        style={{
          marginRight: "1em",
        }}
      />
    </a>

    <a
      href="https://www.linkedin.com/in/veeral-shah-b1701511a/"
      target="blank"
      rel="noopener noreferrer"
      style={{
        borderBottom: "none",
      }}
    >
      <FaLinkedinIn
        style={{
          marginRight: "1em",
        }}
      />
    </a>
  </div>
)
