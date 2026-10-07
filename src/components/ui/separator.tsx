import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const separatorVariants = cva(
  "shrink-0 data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
  {
    variants: {
      variant: {
        default: "bg-border data-horizontal:h-px",
        dashed:
          "border-t border-dashed border-foreground/24 bg-transparent data-horizontal:h-0",
        solid:
          "border-t border-foreground/65 bg-transparent data-horizontal:h-0",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Separator({
  className,
  orientation = "horizontal",
  variant = "default",
  ...props
}: SeparatorPrimitive.Props & VariantProps<typeof separatorVariants>) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      data-variant={variant}
      orientation={orientation}
      className={cn(separatorVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Separator, separatorVariants }
