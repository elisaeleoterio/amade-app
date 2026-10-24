import { ShiftInfoModal } from "@/components/lojista/modals/ShiftInfoModal";
import { CalendarModal } from "@/components/shared/calendarModal";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { useShift } from "@/contexts/ShiftContext";
import { useRouter } from "expo-router";
import { CalendarDays, Info, ShoppingBag } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function StartShiftScreen() {
  const role = "lojista";
  const colors = roleConfig[role];
  const router = useRouter();
  const [isInfoShiftOpen, setInfoShiftOpen] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const { startShift } = useShift();

  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(
    () => new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  );
  const currentHour = String(now.getHours()).padStart(2, "0");
  const currentMinute = String(now.getMinutes()).padStart(2, "0");

  const [hour, setHour] = useState(currentHour);
  const [minute, setMinute] = useState(currentMinute);

  const handleStartShift = () => {
    const dateStr = `${String(selectedDate.getDate()).padStart(2, "0")}/${String(
      selectedDate.getMonth() + 1,
    ).padStart(2, "0")}/${selectedDate.getFullYear()}`;
    const timeStr = `${hour}:${minute}`;
    startShift(dateStr, timeStr);
    router.replace("/(authenticated)/lojista/shift/active");
  };
  const op: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <ScreenTemplate
      isStatic
      navbar={{
        appRole: role,
        title: "Novo Turno",
        leftContent: (
          <Info
            color={colors.dark}
            size={24}
            strokeWidth={1.5}
            onPress={() => setInfoShiftOpen(true)}
          />
        ),
      }}
      className="bg-general-bg"
      contentClassName="flex-1"
    >
      <View className="flex-1 px-5 pt-4">
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 180 }}
        >
          <View className="items-center pt-4">
            <View className="mb-6 items-center">
              <View className="mb-4">
                <ShoppingBag size={56} color={colors.main} strokeWidth={1.5} />
              </View>

              <Text className="mb-4 text-center font-poppins-medium text-3xl leading-10 text-lojista-main">
                Começar um{"\n"}novo turno
              </Text>

              <Text className="px-2 text-center font-poppins-light text-lg leading-8 text-lojista-dark">
                Ao iniciar um novo turno, você entrará no ambiente onde poderá
                selecionar produtos para processar a venda e baixar no estoque.
                Só poderá sair ao Finalizar o Turno ou Cancelando.
              </Text>
            </View>

            {/* Data */}
            <View className="mb-6 w-full">
              <Text className="mb-2 font-poppins-regular text-lojista-dark">
                Data
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setCalendarOpen(true)}
                className="h-12 flex-row items-center bg-lojista-main/5 justify-between rounded-xl border border-lojista-surface px-4"
              >
                <Text className="font-poppins-regular text-lg text-lojista-dark">
                  {selectedDate.toLocaleDateString("pt-BR", op)}
                </Text>
                <CalendarDays size={20} color={colors.main} />
              </TouchableOpacity>
            </View>

            {/* Horário */}
            <View className="mb-10 w-full">
              <Text className="mb-2 font-poppins-regular text-lojista-dark">
                Horário Início
              </Text>
              <View className="w-1/2 flex-row items-center justify-start gap-3">
                <Input
                  appRole={role}
                  className="h-12 flex-1 rounded-xl border border-lojista-surface text-center font-poppins-regular text-lg text-lojista-dark"
                  keyboardType="number-pad"
                  maxLength={2}
                  value={hour}
                  onChangeText={setHour}
                />
                <Text className="pb-1 font-poppins-semibold text-xl text-lojista-dark">
                  :
                </Text>
                <Input
                  appRole={role}
                  className="h-12 flex-1 rounded-xl border border-lojista-surface text-center font-poppins-regular text-lg text-lojista-dark"
                  keyboardType="number-pad"
                  maxLength={2}
                  value={minute}
                  onChangeText={setMinute}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="mb-24 flex-row justify-between gap-4 border-t border-lojista-surface bg-general-bg py-4">
          <Button
            appRole={role}
            variant="outline"
            size="md"
            onPress={() => router.back()}
          >
            <Text>Cancelar</Text>
          </Button>
          <Button
            appRole={role}
            variant="default"
            size="md"
            onPress={handleStartShift}
          >
            <Text className="text-center">Iniciar Turno</Text>
          </Button>
        </View>
      </View>

      {/* Modals */}
      <ShiftInfoModal
        visible={isInfoShiftOpen}
        onClose={() => setInfoShiftOpen(false)}
      />
      <CalendarModal
        visible={isCalendarOpen}
        onClose={() => setCalendarOpen(false)}
        onConfirm={(date) => {
          if (date) setSelectedDate(date);
          setCalendarOpen(false);
        }}
        initialStartDate={selectedDate}
        role={role}
        selectPeriod={false}
      />
    </ScreenTemplate>
  );
}
