import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from "lucide-react";

interface CarOffer {
  id: number;
  placa: string;
  modelo: string;
  mod: string;
  cor: string;
  km: number;
  fipe: string;
  vlr: number;
  margem: number;
  perc_fipe: string;
  discountPercent: number;
}

interface OfferAnalyticsChartsProps {
  offers: CarOffer[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--secondary))'];

export default function OfferAnalyticsCharts({ offers }: OfferAnalyticsChartsProps) {
  const priceDistribution = useMemo(() => {
    const ranges = [
      { name: "Até 20k", min: 0, max: 20000 },
      { name: "20k-40k", min: 20000, max: 40000 },
      { name: "40k-60k", min: 40000, max: 60000 },
      { name: "60k-80k", min: 60000, max: 80000 },
      { name: "80k-100k", min: 80000, max: 100000 },
      { name: "100k+", min: 100000, max: Infinity },
    ];

    return ranges.map(range => ({
      name: range.name,
      count: offers.filter(offer => offer.vlr >= range.min && offer.vlr < range.max).length,
      avgPrice: Math.round(
        offers
          .filter(offer => offer.vlr >= range.min && offer.vlr < range.max)
          .reduce((sum, offer) => sum + offer.vlr, 0) /
        Math.max(1, offers.filter(offer => offer.vlr >= range.min && offer.vlr < range.max).length)
      )
    }));
  }, [offers]);

  const kmDistribution = useMemo(() => {
    const ranges = [
      { name: "0-20k km", min: 0, max: 20000 },
      { name: "20k-50k km", min: 20000, max: 50000 },
      { name: "50k-100k km", min: 50000, max: 100000 },
      { name: "100k-150k km", min: 100000, max: 150000 },
      { name: "150k+ km", min: 150000, max: Infinity },
    ];

    return ranges.map(range => ({
      name: range.name,
      count: offers.filter(offer => offer.km >= range.min && offer.km < range.max).length,
    }));
  }, [offers]);

  const discountDistribution = useMemo(() => {
    const ranges = [
      { name: "0-10%", min: 0, max: 10 },
      { name: "10-20%", min: 10, max: 20 },
      { name: "20-30%", min: 20, max: 30 },
      { name: "30-40%", min: 30, max: 40 },
      { name: "40%+", min: 40, max: 100 },
    ];

    return ranges.map(range => ({
      name: range.name,
      count: offers.filter(offer => offer.discountPercent >= range.min && offer.discountPercent < range.max).length,
      avgDiscount: offers
        .filter(offer => offer.discountPercent >= range.min && offer.discountPercent < range.max)
        .reduce((sum, offer) => sum + offer.discountPercent, 0) /
        Math.max(1, offers.filter(offer => offer.discountPercent >= range.min && offer.discountPercent < range.max).length)
    }));
  }, [offers]);

  const colorDistribution = useMemo(() => {
    const colorCounts = offers.reduce((acc, offer) => {
      const color = offer.cor.toLowerCase();
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(colorCounts)
      .map(([color, count]) => ({ name: color, value: count }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8 colors
  }, [offers]);

  const modelDistribution = useMemo(() => {
    const modelCounts = offers.reduce((acc, offer) => {
      // Extract brand from model
      const brand = offer.modelo.split(' ')[0];
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(modelCounts)
      .map(([brand, count]) => ({ name: brand, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 brands
  }, [offers]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Price Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Distribuição de Preços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* KM Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Distribuição de Quilometragem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kmDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Discount Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-success" />
            Distribuição de Descontos FIPE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={discountDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Color Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-warning" />
            Distribuição por Cor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={colorDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {colorDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Brand Distribution - Full Width */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Top 10 Marcas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}