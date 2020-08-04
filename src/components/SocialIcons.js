import * as React from "react"
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { css } from "@emotion/core"

export default () => (
  <div
    className="social-icons"
    css={css`
      display: flex;
      flex-direction: row;
    `}
  >
    <a
      href="https://instagram.com/veeral_shah"
      target="blank"
      rel="noopener noreferrer"
      hover={{
        textShadow: "2px 1 0 steelblue",
      }}
      style={{
        borderBottom: "none",
        backgroundImage: "none",
      }}
    >
      <FaInstagram className="icons" />
    </a>
    <a
      href="https://github.com/shahv1057"
      target="blank"
      rel="noopener noreferrer"
      style={{
        borderBottom: "none",
      }}
    >
      <FaGithub className="icons" />
    </a>

    <a
      href="https://www.linkedin.com/in/veeral-shah-b1701511a/"
      target="blank"
      rel="noopener noreferrer"
      style={{
        borderBottom: "none",
      }}
    >
      <FaLinkedinIn className="icons" />
    </a>
  </div>
)
