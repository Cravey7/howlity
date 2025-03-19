"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

interface DesignSystem {
  id: string;
  name: string;
  color_palettes: {
    id: string;
    name: string;
    colors: string[];
  }[];
  typography: {
    id: string;
    name: string;
    font_family: string;
    font_size: string;
    line_height: string;
  }[];
  spacing: {
    id: string;
    name: string;
    value: string;
  }[];
}

export default function SettingsPage() {
  const [designSystem, setDesignSystem] = useState<DesignSystem | null>(null);
  const { theme, setTheme } = useTheme();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchDesignSystem = async () => {
      try {
        const { data, error } = await supabase
          .from("design_systems")
          .select(`
            *,
            color_palettes (*),
            typography (*),
            spacing (*)
          `)
          .single();

        if (error) throw error;
        setDesignSystem(data);
      } catch (error) {
        console.error("Error fetching design system:", error);
      }
    };

    fetchDesignSystem();
  }, [supabase]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {designSystem && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Palettes</CardTitle>
              <CardDescription>System color schemes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {designSystem.color_palettes.map((palette) => (
                  <div key={palette.id} className="space-y-2">
                    <h3 className="font-medium">{palette.name}</h3>
                    <div className="flex gap-1">
                      {palette.colors.map((color, index) => (
                        <div
                          key={index}
                          className="h-8 w-8 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Text styles and fonts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {designSystem.typography.map((type) => (
                  <div key={type.id} className="space-y-2">
                    <h3 className="font-medium">{type.name}</h3>
                    <p
                      style={{
                        fontFamily: type.font_family,
                        fontSize: type.font_size,
                        lineHeight: type.line_height,
                      }}
                    >
                      Sample Text
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 