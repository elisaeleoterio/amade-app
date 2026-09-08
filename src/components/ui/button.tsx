import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Pressable } from "react-native";

const buttonVariantsAdmin = cva(
  cn(" flex-row items-center justify-center rounded-[20px]"),
  {
    variants: {
      variant: {
        default: cn("bg-admin-main active:bg-admin-main/80"),
        outline: cn(
          "bg-transparent border-2 border-admin-main active:bg-admin-surface active:border-admin-main/80",
        ),
        secondary: cn("bg-secondary active:bg-secondary/80"),
        ghost: cn("bg-admin-surface active:bg-admin-surface/80"),
        ghostOutline: cn(
          "bg-transparent border-2 border-admin-surface active:bg-admin-surface active:border-admin-surface/80",
        ),
      },
      size: {
        default: cn("h-14 px-10"),
        sm: cn("h-10 w-32 rounded-2xl"),
        lg: cn("h-16 px-20"),
        icon: cn("h-14 w-14"),
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonVariantsArtesao = cva(
  cn(" flex-row items-center justify-center rounded-[20px]"),
  {
    variants: {
      variant: {
        default: cn("bg-artesao-main active:bg-artesao-main/80"),
        outline: cn(
          "bg-transparent border-2 border-artesao-main active:bg-artesao-surface active:border-artesao-main/80",
        ),
        secondary: cn("bg-secondary active:bg-secondary/80"),
        ghost: cn("bg-artesao-surface active:bg-artesao-surface/80"),
        ghostOutline: cn(
          "bg-transparent border-2 border-artesao-surface active:bg-artesao-surface active:border-artesao-surface/80",
        ),
      },
      size: {
        default: cn("h-14 px-10"),
        sm: cn("h-10 w-32 rounded-2xl"),
        lg: cn("h-16 px-20"),
        icon: cn("h-14 w-14"),
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonVariantsLojista = cva(
  cn(" flex-row items-center justify-center rounded-[20px]"),
  {
    variants: {
      variant: {
        default: cn("bg-lojista-main active:bg-lojista-main/80"),
        outline: cn(
          "bg-transparent border-2 border-lojista-main active:bg-lojista-surface active:border-lojista-main/80",
        ),
        secondary: cn("bg-secondary active:bg-secondary/80"),
        ghost: cn("bg-lojista-surface active:bg-lojista-surface/80"),
        ghostOutline: cn(
          "bg-transparent border-2 border-lojista-surface active:bg-lojista-surface active:border-lojista-surface/80",
        ),
      },
      size: {
        default: cn("h-14 px-10"),
        sm: cn("h-10 w-32 rounded-2xl"),
        lg: cn("h-16 px-20"),
        icon: cn("h-14 w-14"),
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonTextVariantsAdmin = cva(cn("font-poppins-regular text-lg"), {
  variants: {
    variant: {
      default: "text-general-bg",
      outline: "text-admin-main",
      secondary: "text-admin-dark",
      ghost: "text-general-bg",
      ghostOutline: "text-admin-surface",
    },
    size: {
      default: "text-lg",
      sm: "text-md",
      lg: "text-xl",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const buttonTextVariantsArtesao = cva(cn("font-poppins-regular text-lg"), {
  variants: {
    variant: {
      default: "text-general-bg",
      outline: "text-artesao-main",
      secondary: "text-artesao-dark",
      ghost: "text-general-bg",
      ghostOutline: "text-artesao-surface",
    },
    size: {
      default: "text-lg",
      sm: "text-md",
      lg: "text-lg",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const buttonTextVariantsLojista = cva(cn("font-poppins-regular text-lg"), {
  variants: {
    variant: {
      default: "text-general-bg",
      outline: "text-lojista-main",
      secondary: "text-lojista-dark",
      ghost: "text-general-bg",
      ghostOutline: "text-lojista-surface",
    },
    size: {
      default: "text-lg",
      sm: "text-md",
      lg: "text-lg",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type AppRole = "admin" | "artesao" | "lojista";

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariantsAdmin> & {
    appRole?: AppRole;
  };

const buttonVariantsByRole = {
  admin: buttonVariantsAdmin,
  artesao: buttonVariantsArtesao,
  lojista: buttonVariantsLojista,
} as const;

const buttonTextVariantsByRole = {
  admin: buttonTextVariantsAdmin,
  artesao: buttonTextVariantsArtesao,
  lojista: buttonTextVariantsLojista,
} as const;

function Button({
  className,
  variant,
  size,
  appRole = "admin",
  role = "button",
  ...props
}: ButtonProps) {
  const selectedButtonVariants = buttonVariantsByRole[appRole];
  const selectedTextVariants = buttonTextVariantsByRole[appRole];

  return (
    <TextClassContext.Provider value={selectedTextVariants({ variant, size })}>
      <Pressable
        className={cn(
          props.disabled && "opacity-50",
          selectedButtonVariants({ variant, size }),
          className,
        )}
        role={role}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariantsAdmin, buttonVariantsAdmin };
export type { ButtonProps };

