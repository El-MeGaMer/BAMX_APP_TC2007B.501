// This screen is used to create a new log entry, destinated to
// users that capture the information
// role: area_supervisor

import { View } from "../components/Themed";
import Container from "../components/Container";

import { styled } from "nativewind";

import Background from "../components/Background";
import SelectLogButton from "../components/SelectLogButton";

const StyledView = styled(View);

export default function CreateLogScreen() {
  return (
    <StyledView className="flex-1 ">
      <Background>
        <Container className>
          <SelectLogButton
            text="Bitacora Limpieza Recibo"
            destinatedLog="bitacora_limpiezaRecibo"
          />
          <SelectLogButton
            text="Bitacora Limpieza"
            destinatedLog="bitacora_limpieza"
          />
        </Container>
      </Background>
    </StyledView>
  );
}
