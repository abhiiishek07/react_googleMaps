import React from "react";
import styled from "styled-components";

function Navbar() {
  return (
    <Container>
      <Image src="https://s3-alpha-sig.figma.com/img/2f82/e66d/966f603beed041e91813bea279497100?Expires=1664755200&Signature=hIXlaXlNWysSOov--Pog-~45LzJPBDs~3bJV1H7xGQ9PbK6KoHmKS3TYL3XtaONdM1clidOurFL-6jgi644MOXpNqgmj~Z6W2OjNdvez3svRU9kr0VfR0-DeIL96SNA2cHh7ZRKKxwsKiH~mjrQXevhwaNRD5g0eLy9WXm0vVzBS12BXrr7axzVFJQmLCjUEtd5SwV4BOKWWqARhGyJG3XP2YN1B2hmDmYLLbpHICBALE6UPpwpn4CEswr4e~0SDN~ocB6xbtaDRzU3X~S5SY41NCKK0z1ZVvEVbJyKDvgLVqPti0qWAlUplq3wBGPTgpYkFsyM5iaz4-0uXkwY3qA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 10vh;
  background-color: white;
`;
const Image = styled.img`
  position: absolute;
  width: 160px;
  height: 8vh;
  left: 67px;
  top: 6px;
`;

export default Navbar;
