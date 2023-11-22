// This screen is used to create a new log entry, destinated to
// users that capture the information
// role: area_supervisor

import { View } from "../components/Themed";
import Container from "../components/Container";

import { styled } from "nativewind";

import Background from "../components/Background";
import SelectLogButton from "../components/SelectLogButton";
import { TableInitialValues } from "../constants/TableInitialValues";

const StyledView = styled(View);

export default function CreateLogScreen() {
  return (
    <StyledView className="flex-1 ">
      <Background>
        <Container className>
          <SelectLogButton
            text="Bitacora Limpieza Empaques"
            destinatedLog="bitacoraExtintores"
          />
          <SelectLogButton
            text="Bitacora Limpieza"
            destinatedLog="bitacoraLimpiezaRecibos"
          />
        </Container>
      </Background>
    </StyledView>
  );
}
