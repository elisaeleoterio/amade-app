import { ShiftCard } from "@/components/lojista/shiftCard";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { fetchMockShifts, Shift } from "@/mocks/shiftsMock";
import { Role } from "@/types/role.type";
import { useFocusEffect, useRouter } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from(
  { length: 2026 - currentYear + 1 },
  (_, i) => currentYear + i,
);

export default function MyShifts() {
  const role: Role = "lojista";
  const colors = roleConfig[role];
  const router = useRouter();

  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());

  const selectMonth = (monthIndex: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setShowMonthPicker(false);
  };

  const selectYear = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearPicker(false);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadShifts = async () => {
        try {
          setLoading(true);
          const data = await fetchMockShifts();
          if (isActive) {
            setShifts(data);
          }
        } catch (error) {
          toast.error("Erro ao carregar os turnos");
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      loadShifts();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const filteredShifts = shifts.filter((item) => {
    let shiftDate = item.date;

    return (
      shiftDate.getMonth() === currentDate.getMonth() &&
      shiftDate.getFullYear() === currentDate.getFullYear()
    );
  });

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-general-bg">
        <ActivityIndicator size="large" color={colors.main} />
        <Text
          className="mt-4 font-poppins-regular"
          style={{ color: colors.main }}
        >
          Buscando turnos...
        </Text>
      </View>
    );
  }

  return (
    <ScreenTemplate
      isStatic
      navbar={{
        appRole: role,
        title: "Meus Turnos",
        onBackPress: () => router.back(),
      }}
      className="bg-general-bg"
      contentClassName="flex-1"
    >
      <View className="flex-1 px-5 pt-6">
        <View className="flex-row justify-between items-center z-40 relative mb-6">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setShowMonthPicker(!showMonthPicker);
              setShowYearPicker(false);
            }}
            className="flex-1 mr-2 h-12 flex-row items-center justify-between rounded-2xl bg-general-bg border-2 border-lojista-surface px-4"
          >
            <Text
              className="font-poppins-regular text-lg"
              style={{ color: colors.main }}
            >
              {MONTHS[currentDate.getMonth()]}
            </Text>
            <ChevronDown size={20} color={colors.main} />
          </TouchableOpacity>

          {/* Botão Ano */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setShowYearPicker(!showYearPicker);
              setShowMonthPicker(false);
            }}
            className="w-32 h-12 flex-row items-center justify-between rounded-2xl bg-general-bg border-2 border-lojista-surface px-4"
          >
            <Text
              className="font-poppins-regular text-lg"
              style={{ color: colors.main }}
            >
              {currentDate.getFullYear()}
            </Text>
            <ChevronDown size={20} color={colors.main} />
          </TouchableOpacity>

          {/* Dropdowns */}
          {showMonthPicker && (
            <View className="absolute top-[55px] left-0 w-[65%] border border-gray-100 shadow-2xl rounded-2xl p-3 flex-row flex-wrap justify-between z-50 bg-general-bg elevation-5">
              {MONTHS.map((m, i) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => selectMonth(i)}
                  className="w-[30%] py-3 my-1 rounded-xl items-center"
                  style={
                    currentDate.getMonth() === i
                      ? { backgroundColor: colors.main }
                      : { backgroundColor: colors.surface }
                  }
                >
                  <Text className="font-poppins-medium text-[12px] text-general-bg">
                    {m.substring(0, 3)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {showYearPicker && (
            <View className="absolute top-[55px] right-0 w-32 border border-gray-100 shadow-2xl rounded-2xl z-50 max-h-56 overflow-hidden bg-general-bg elevation-5">
              <View>
                {YEARS.map((y) => (
                  <TouchableOpacity
                    key={y}
                    onPress={() => selectYear(y)}
                    className="py-4 items-center border-b border-gray-100"
                    style={
                      currentDate.getFullYear() === y
                        ? { backgroundColor: colors.main }
                        : { backgroundColor: colors.surface }
                    }
                  >
                    <Text className="font-poppins-medium text-[14px] text-general-bg">
                      {y}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        <View className="flex-1 z-0 mb-12">
          <FlatList
            data={filteredShifts}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 40, gap: 7 }}
            ListEmptyComponent={
              <Text className="text-center font-poppins-regular text-lojista-dark mt-10">
                Nenhum turno registado neste mês.
              </Text>
            }
            renderItem={({ item }) => (
              <ShiftCard
                role={role}
                pieces={item.pieces}
                date={item.date}
                startTime={item.startTime}
                totalValue={item.totalValue}
                onPress={() => console.log("Apertou")}
              />
            )}
          />
        </View>
      </View>
    </ScreenTemplate>
  );
}
