import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DataTableActionCellProps } from "../../interface";

export function DataTableActionCell({
  menuLabel = "Actions",
  menuItems,
  icon = <MoreHorizontal className="h-4 w-4" />,
  className,
  style,
}: DataTableActionCellProps) {
  return (
    <div className={className ? className : "flex justify-end"} style={style}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{menuLabel}</span>
            {icon}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {menuLabel && <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>}
          {menuItems.map((item, index) =>
            item.separator ? (
              <DropdownMenuSeparator key={`separator-${index}`} />
            ) : (
              <DropdownMenuItem key={item.label} onClick={item.onClick}>
                {item.label}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
