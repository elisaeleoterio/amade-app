import { Text } from "@/components/ui/text";
import type { Role } from "@/types/role.type";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (startDate: Date | null, endDate: Date | null) => void;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  role: Role;
  selectPeriod?: boolean;
}

const MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];
const DAYS_OF_WEEK = ["D", "S", "T", "Q", "Q", "S", "S"];
const YEARS = Array.from({ length: 50 }, (_, i) => 2026 + i);

export const CalendarModal = ({
  visible,
  onClose,
  onConfirm,
  initialStartDate,
  initialEndDate,
  role = "artesao",
  selectPeriod = true,
}: CalendarModalProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const theme = useMemo(() => {
    const configs = {
      artesao: {
        hex: "#14532D",
        bg: "#166534",
        text: "#166534",
        mainText: "#14532D",
        border: "#166534",
        lightBg: "#E5EFE5",
      },
      lojista: {
        hex: "#9F1239",
        bg: "#810F2F",
        text: "#810F2F",
        mainText: "#4C0519",
        border: "#810F2F",
        lightBg: "#E9CCD2",
      },
      admin: {
        hex: "#712B05",
        bg: "#712B05",
        text: "#712B05",
        mainText: "#2A0F01",
        border: "#712B05",
        lightBg: "#E0D1C7",
      },
    };
    return configs[role] || configs.artesao;
  }, [role]);

  useEffect(() => {
    if (visible) {
      setStartDate(initialStartDate || null);
      if (selectPeriod) {
        setEndDate(initialEndDate || null);
      } else {
        setEndDate(null);
      }

      setCurrentDate(
        initialStartDate ? new Date(initialStartDate) : new Date(),
      );
      setShowMonthPicker(false);
      setShowYearPicker(false);
    }
  }, [visible, initialStartDate, initialEndDate, selectPeriod]);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
    setShowMonthPicker(false);
    setShowYearPicker(false);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
    setShowMonthPicker(false);
    setShowYearPicker(false);
  };

  const selectMonth = (monthIndex: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setShowMonthPicker(false);
  };

  const selectYear = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearPicker(false);
  };

  const handleDayPress = (date: Date) => {
    setShowMonthPicker(false);
    setShowYearPicker(false);

    if (!selectPeriod) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date < startDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  }, [currentDate]);

  const isSelectedStart = (d: Date) =>
    startDate && d.getTime() === startDate.getTime();
  const isSelectedEnd = (d: Date) =>
    endDate && d.getTime() === endDate.getTime();
  const isSelectedOnlyOne = (d: Date) => isSelectedStart(d) && !endDate;
  const isInRange = (d: Date) =>
    startDate && endDate && d > startDate && d < endDate;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center px-4"
        onPress={onClose}
      >
        <Pressable
          className={`w-full bg-general-bg rounded-3xl p-6 border shadow-xl relative z-10`}
          style={{ borderColor: theme.border }}
        >
          {/* Header Actions */}
          <View className="flex-row justify-between items-center mb-2">
            <TouchableOpacity
              onPress={() => onConfirm(startDate, endDate)}
              className="px-2"
            >
              <Check size={24} color={theme.hex} strokeWidth={2.5} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} className="px-2">
              <X size={24} color={theme.hex} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          {/* Seletores Dinâmicos de Mês/Ano */}
          <View className="flex-row justify-between items-center px-2 mb-6">
            <TouchableOpacity onPress={handlePrevMonth} className="p-2">
              <ChevronLeft size={24} color={theme.hex} />
            </TouchableOpacity>

            <View className="flex-row gap-3 relative">
              {/* Botão Dropdown Mês */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowMonthPicker(!showMonthPicker);
                  setShowYearPicker(false);
                }}
                className="border-2 rounded-xl px-8 py-2 flex-row items-center bg-surface"
                style={
                  showMonthPicker
                    ? { borderColor: theme.border }
                    : { borderColor: theme.lightBg }
                }
              >
                <Text className="font-poppins-regular text-left mr-2">
                  {MONTHS[currentDate.getMonth()]}
                </Text>
                <ChevronRight
                  size={16}
                  className={showMonthPicker ? "-rotate-90" : "rotate-90"}
                  color={theme.bg}
                />
              </TouchableOpacity>

              {/* Botão Dropdown Ano */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowYearPicker(!showYearPicker);
                  setShowMonthPicker(false);
                }}
                className="border-2 rounded-xl px-4 py-2 flex-row items-center bg-general-bg"
                style={
                  showMonthPicker
                    ? { borderColor: theme.border }
                    : { borderColor: theme.lightBg }
                }
              >
                <Text className="font-poppins-regular text-left mr-2">
                  {currentDate.getFullYear()}
                </Text>
                <ChevronRight
                  size={16}
                  className={showYearPicker ? "-rotate-90" : "rotate-90"}
                  color={theme.bg}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleNextMonth} className="p-2">
              <ChevronRight size={24} color={theme.mainText} />
            </TouchableOpacity>
          </View>

          {/* Container do Calendário */}
          <View
            className="border-[1.5px] rounded-2xl p-3"
            style={{ borderColor: theme.bg }}
          >
            <View className="flex-row justify-around mb-2">
              {DAYS_OF_WEEK.map((day, i) => (
                <Text
                  key={i}
                  className="font-poppins-medium w-10 text-center"
                  style={{ color: theme.mainText }}
                >
                  {day}
                </Text>
              ))}
            </View>

            <View className="gap-2">
              {calendarDays.map((week, weekIdx) => (
                <View
                  key={weekIdx}
                  className="flex-row justify-around items-center"
                >
                  {week.map((dayObj, dayIdx) => {
                    const isStart = isSelectedStart(dayObj.date);
                    const isEnd = isSelectedEnd(dayObj.date);
                    const isRange = isInRange(dayObj.date);
                    const isOnlyOne = isSelectedOnlyOne(dayObj.date);

                    let bgColor = "transparent";
                    let textColor = dayObj.isCurrentMonth
                      ? "#1f2937"
                      : "#d1d5db";

                    if (isStart || isEnd || isOnlyOne) {
                      bgColor = theme.bg;
                      textColor = "#ffffff";
                    } else if (isRange && selectPeriod) {
                      bgColor = theme.lightBg;
                      textColor = "#1f2937";
                    }

                    return (
                      <TouchableOpacity
                        key={dayIdx}
                        activeOpacity={0.7}
                        onPress={() => handleDayPress(dayObj.date)}
                        className="rounded-xl w-10 h-10 items-center justify-center"
                        style={{ backgroundColor: bgColor }}
                      >
                        <Text
                          className="text-center font-poppins-medium"
                          style={{ color: textColor }}
                        >
                          {dayObj.day}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>

          {/* Menus Flutuantes (Dropdowns) */}
          {showMonthPicker && (
            <View className="absolute top-[100px] left-[5%] w-[70%] bg-white border border-gray-100 shadow-2xl rounded-2xl p-3 flex-row flex-wrap justify-between z-50">
              {MONTHS.map((m, i) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => selectMonth(i)}
                  className="w-[30%] py-3 my-1 rounded-xl items-center"
                  style={
                    currentDate.getMonth() === i
                      ? { backgroundColor: theme.bg }
                      : { backgroundColor: theme.lightBg }
                  }
                >
                  <Text
                    className="font-poppins-medium"
                    style={
                      currentDate.getMonth() === i
                        ? { color: "white" }
                        : { color: theme.mainText }
                    }
                  >
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {showYearPicker && (
            <View className="absolute top-[100px] right-[20%] w-32 bg-white border border-gray-100 shadow-2xl rounded-2xl z-50 max-h-56 overflow-hidden">
              <ScrollView showsVerticalScrollIndicator={false}>
                {YEARS.map((y) => (
                  <TouchableOpacity
                    key={y}
                    onPress={() => selectYear(y)}
                    className="py-4 items-center border-b border-gray-100"
                    style={
                      currentDate.getFullYear() === y
                        ? { backgroundColor: theme.lightBg }
                        : { backgroundColor: "" }
                    }
                  >
                    <Text
                      className="font-poppins-medium"
                      style={
                        currentDate.getFullYear() === y
                          ? { color: theme.text }
                          : { color: theme.mainText }
                      }
                    >
                      {y}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};
