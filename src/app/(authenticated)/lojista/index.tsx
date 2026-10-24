import AmadeLogo from "@/assets/logoComplete.svg";
import { ShiftCard } from "@/components/lojista/shiftCard";
import { RedirectCard } from "@/components/shared/redirectCard";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { fetchMockShifts, Shift } from "@/mocks/shiftsMock";
import { MOCK_USER_ARTESAO_LOJISTA, UserProfile } from "@/mocks/userMock";
import { Role } from "@/types/role.type";
import { useRouter } from "expo-router";
import { FolderOpen } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreenLojista() {
  const role: Role = "lojista";
  const colors = roleConfig[role];
  const [user, setUser] = useState<UserProfile | null>(null);

  const [recentShifts, setRecentShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setUser(MOCK_USER_ARTESAO_LOJISTA);

    const loadShifts = async () => {
      try {
        setLoading(true);
        const data = await fetchMockShifts();

        const getShiftDateTime = (shift: Shift) => {
          const [hours, minutes] = shift.startTime.split(":").map(Number);
          const dateTime = new Date(shift.date);
          dateTime.setHours(hours, minutes, 0, 0);
          return dateTime.getTime();
        };

        const shiftsOrdenados = [...data].sort(
          (a, b) => getShiftDateTime(b) - getShiftDateTime(a),
        );

        setRecentShifts(shiftsOrdenados.slice(0, 5));
      } catch (error) {
        console.error("Erro ao buscar turnos", error);
      } finally {
        setLoading(false);
      }
    };

    loadShifts();
  }, []);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-general-bg">
        <ActivityIndicator size="large" color={colors.main} />
        <Text className="mt-4 font-poppins-regular text-lojista-main">
          Buscando dados...
        </Text>
      </View>
    );
  }

  return (
    <ScreenTemplate
      navbar={{
        showBack: false,
        appRole: role,
        rightContent: (
          <View>
            <AmadeLogo color={colors.main} width={50} height={45} />
          </View>
        ),
        leftContent: (
          <Text className="font-poppins-medium text-lojista-main text-lg">
            Olá, {user.name.first}!
          </Text>
        ),
      }}
      className="bg-general-bg"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="px-2 mt-4">
          {/* Meus Turnos */}
          <Text className="font-poppins-regular text-xl text-lojista-dark mb-4">
            Meus Turnos
          </Text>

          {recentShifts.length === 0 ? (
            <Text className="font-poppins-extraLight text-lojista-main mb-6">
              Nenhum turno registrado.
            </Text>
          ) : (
            recentShifts.map((Shift) => (
              <ShiftCard
                key={Shift.id}
                role={role}
                pieces={Shift.pieces}
                date={Shift.date}
                startTime={Shift.startTime}
                totalValue={Shift.totalValue}
                onPress={() => {
                  console.log(`Turno ${Shift.id} selecionado`);
                }}
              />
            ))
          )}

          {/* Botão Ver Mais*/}
          {recentShifts.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              className="py-2 mb-6"
              onPress={() => router.push("/lojista/myShifts")}
            >
              <Text className="text-center font-poppins-semibold text-[16px] text-lojista-main">
                Ver Mais
              </Text>
            </TouchableOpacity>
          )}

          {/* Card de Iniciar Turno */}
          <RedirectCard
            title="Iniciar Turno"
            description="Iniciar um período de vendas para registrar produtos."
            icon={FolderOpen}
            route="/(authenticated)/lojista/newShift"
            role={role}
          />
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
}
