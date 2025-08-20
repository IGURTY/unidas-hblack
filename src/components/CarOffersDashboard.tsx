import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, TrendingUp, Award, DollarSign, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import OfferAnalyticsCharts from "./charts/OfferAnalyticsCharts";

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
}

interface Weights {
  year: number;
  km: number;
  discount: number;
}

export default function CarOffersDashboard() {
  const [offers, setOffers] = useState<CarOffer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<CarOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [weights, setWeights] = useState<Weights>({ year: 33, km: 33, discount: 34 });
  const [filters, setFilters] = useState({
    modelo: "",
    cor: "",
    kmMin: "",
    kmMax: "",
    priceMin: "",
    priceMax: "",
    discountMin: "",
    discountMax: "",
  });
  const [sortBy, setSortBy] = useState<keyof CarOffer | "score">("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from("carros")
        .select("*")
        .order("id");

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error("Error fetching offers:", error);
      toast.error("Erro ao carregar ofertas");
    } finally {
      setLoading(false);
    }
  };

  // Calculate scores for offers
  const offersWithScores = useMemo(() => {
    return offers.map((offer) => {
      // Extract year from model (assuming format like "2020/2021")
      const yearMatch = offer.mod.match(/(\d{4})/);
      const year = yearMatch ? parseInt(yearMatch[1]) : 2000;
      const currentYear = new Date().getFullYear();
      
      // Normalize scores (0-100)
      const yearScore = Math.max(0, Math.min(100, ((year - 2000) / (currentYear - 2000)) * 100));
      const kmScore = Math.max(0, Math.min(100, 100 - (offer.km / 300000) * 100));
      
      // Parse discount percentage
      const discountMatch = offer.perc_fipe.match(/(\d+\.?\d*)/);
      const discountPercent = discountMatch ? parseFloat(discountMatch[1]) : 0;
      const discountScore = Math.min(100, (discountPercent / 50) * 100);

      // Calculate weighted score
      const totalScore = (
        (yearScore * weights.year / 100) +
        (kmScore * weights.km / 100) +
        (discountScore * weights.discount / 100)
      );

      return {
        ...offer,
        score: totalScore,
        yearScore,
        kmScore,
        discountScore,
        year,
        discountPercent,
      };
    });
  }, [offers, weights]);

  // Apply filters and sorting
  const processedOffers = useMemo(() => {
    let filtered = offersWithScores.filter((offer) => {
      return (
        (!filters.modelo || offer.modelo.toLowerCase().includes(filters.modelo.toLowerCase())) &&
        (!filters.cor || offer.cor.toLowerCase().includes(filters.cor.toLowerCase())) &&
        (!filters.kmMin || offer.km >= parseInt(filters.kmMin)) &&
        (!filters.kmMax || offer.km <= parseInt(filters.kmMax)) &&
        (!filters.priceMin || offer.vlr >= parseFloat(filters.priceMin)) &&
        (!filters.priceMax || offer.vlr <= parseFloat(filters.priceMax)) &&
        (!filters.discountMin || offer.discountPercent >= parseFloat(filters.discountMin)) &&
        (!filters.discountMax || offer.discountPercent <= parseFloat(filters.discountMax))
      );
    });

    // Sort offers
    filtered.sort((a, b) => {
      let aVal = a[sortBy as keyof typeof a];
      let bVal = b[sortBy as keyof typeof b];
      
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      
      if (sortOrder === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return filtered;
  }, [offersWithScores, filters, sortBy, sortOrder]);

  const topOffers = processedOffers.slice(0, 3);

  const handleWeightChange = (type: keyof Weights, value: number) => {
    const remaining = 100 - value;
    const otherTwo = Object.keys(weights).filter(k => k !== type) as (keyof Weights)[];
    const ratio = weights[otherTwo[0]] / (weights[otherTwo[0]] + weights[otherTwo[1]]) || 0.5;
    
    setWeights({
      ...weights,
      [type]: value,
      [otherTwo[0]]: Math.round(remaining * ratio),
      [otherTwo[1]]: Math.round(remaining * (1 - ratio)),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface p-3 sm:p-6 space-y-4 sm:space-y-6">
      {/* Banner com imagem PNG */}
      <div className="relative w-full rounded-xl overflow-hidden mb-4 sm:mb-6">
        <div className="bg-gradient-to-br from-primary/90 via-accent/80 to-surface-muted/80 p-8 sm:p-12 flex flex-col items-center justify-center min-h-[180px] sm:min-h-[240px] shadow-lg">
          <img
            src="/placeholder.svg"
            alt="Banner"
            className="w-32 h-32 sm:w-44 sm:h-44 object-contain mb-4 drop-shadow-lg"
            style={{ background: "transparent" }}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary-foreground drop-shadow-lg text-center">
            Auto Offer Explorer
          </h1>
          <p className="mt-2 text-base sm:text-xl text-primary-foreground/90 text-center font-medium">
            Descubra as melhores ofertas de veículos
          </p>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="space-y-4">
        <Card className="bg-primary-muted/50 border-primary/20">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold text-sm sm:text-base text-foreground">Como usar os filtros:</h3>
                <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                  <p>• <strong>Critérios de Pontuação:</strong> Ajuste os pesos para personalizar o ranking</p>
                  <p>• <strong>Filtros Avançados:</strong> Refine a busca por modelo, cor, faixa de quilometragem e preço</p>
                  <p className="hidden sm:block">• <strong>Ordenação:</strong> Clique nas colunas da tabela ou use o seletor para ordenar os resultados</p>
                  <p className="hidden sm:block">• <strong>Análises:</strong> Acesse a aba "Análises" para visualizar gráficos de distribuição dos dados</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content in Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
            <span className="sm:hidden">Ofertas</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Análises</span>
            <span className="sm:hidden">Gráficos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
          {/* Weight Controls */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                Critérios de Pontuação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center justify-between text-xs sm:text-sm">
                    Ano do Veículo
                    <span className="text-xs sm:text-sm font-medium">{weights.year}%</span>
                  </Label>
                  <Slider
                    value={[weights.year]}
                    onValueChange={([value]) => handleWeightChange("year", value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center justify-between text-xs sm:text-sm">
                    Quilometragem
                    <span className="text-xs sm:text-sm font-medium">{weights.km}%</span>
                  </Label>
                  <Slider
                    value={[weights.km]}
                    onValueChange={([value]) => handleWeightChange("km", value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center justify-between text-xs sm:text-sm">
                    Desconto FIPE
                    <span className="text-xs sm:text-sm font-medium">{weights.discount}%</span>
                  </Label>
                  <Slider
                    value={[weights.discount]}
                    onValueChange={([value]) => handleWeightChange("discount", value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Offers */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
              Melhores Ofertas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {topOffers.map((offer, index) => (
                <Card key={offer.id} className={`relative overflow-hidden ${index === 0 ? 'bg-gradient-to-br from-accent/20 via-primary/10 to-success/20 border-2 border-accent/30 shadow-lg shadow-accent/20' : ''}`}>
                  {index === 0 && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-accent to-accent/90 text-accent-foreground px-2 sm:px-3 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      <span className="hidden sm:inline">#1 MELHOR OFERTA</span>
                      <span className="sm:hidden">#1</span>
                    </div>
                  )}
                  <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        Score: {offer.score.toFixed(1)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{offer.placa}</Badge>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg line-clamp-1">{offer.modelo}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{offer.mod} • {offer.cor}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <p className="text-muted-foreground">Quilometragem</p>
                        <p className="font-medium">{offer.km.toLocaleString()} km</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Valor</p>
                        <p className="font-medium">R$ {offer.vlr.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs sm:text-sm text-muted-foreground">Desconto FIPE</span>
                      <Badge variant="default" className="bg-success text-success-foreground text-xs">
                        {offer.perc_fipe}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base sm:text-lg">Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                  <Label className="text-xs sm:text-sm">Modelo</Label>
                  <Input
                    placeholder="Buscar modelo..."
                    value={filters.modelo}
                    onChange={(e) => setFilters({ ...filters, modelo: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm">Cor</Label>
                  <Input
                    placeholder="Cor..."
                    value={filters.cor}
                    onChange={(e) => setFilters({ ...filters, cor: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm">KM Mín</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.kmMin}
                    onChange={(e) => setFilters({ ...filters, kmMin: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm">KM Máx</Label>
                  <Input
                    type="number"
                    placeholder="300000"
                    value={filters.kmMax}
                    onChange={(e) => setFilters({ ...filters, kmMax: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm">Preço Mín</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.priceMin}
                    onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm">Preço Máx</Label>
                  <Input
                    type="number"
                    placeholder="1000000"
                    value={filters.priceMax}
                    onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <Button
                    variant="outline"
                    onClick={() => setFilters({
                      modelo: "",
                      cor: "",
                      kmMin: "",
                      kmMax: "",
                      priceMin: "",
                      priceMax: "",
                      discountMin: "",
                      discountMax: "",
                    })}
                    className="mt-4 lg:mt-6 w-full text-xs sm:text-sm"
                    size="sm"
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Table */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-base sm:text-lg">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                  Todas as Ofertas ({processedOffers.length})
                </span>
                <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                  const [field, order] = value.split("-");
                  setSortBy(field as keyof CarOffer | "score");
                  setSortOrder(order as "asc" | "desc");
                }}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score-desc">Score (Maior)</SelectItem>
                    <SelectItem value="score-asc">Score (Menor)</SelectItem>
                    <SelectItem value="vlr-asc">Preço (Menor)</SelectItem>
                    <SelectItem value="vlr-desc">Preço (Maior)</SelectItem>
                    <SelectItem value="km-asc">KM (Menor)</SelectItem>
                    <SelectItem value="km-desc">KM (Maior)</SelectItem>
                    <SelectItem value="modelo-asc">Modelo (A-Z)</SelectItem>
                    <SelectItem value="modelo-desc">Modelo (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm min-w-[70px]">Score</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[80px]">Placa</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[150px]">Modelo</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[80px]">Mod</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[60px]">Cor</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[80px]">KM</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[100px]">FIPE</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[100px]">Valor</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[100px]">Margem</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[80px]">% FIPE</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {processedOffers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="text-xs sm:text-sm">
                          <Badge variant={offer.score >= 70 ? "default" : offer.score >= 50 ? "secondary" : "outline"} className="text-xs">
                            {offer.score.toFixed(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-xs sm:text-sm">{offer.placa}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{offer.modelo}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{offer.mod}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{offer.cor}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{offer.km.toLocaleString()}</TableCell>
                        <TableCell className="text-xs sm:text-sm">R$ {parseFloat(offer.fipe.replace(/[^\d,.-]/g, "").replace(",", ".")).toLocaleString()}</TableCell>
                        <TableCell className="text-xs sm:text-sm">R$ {offer.vlr.toLocaleString()}</TableCell>
                        <TableCell className="text-xs sm:text-sm">R$ {offer.margem.toLocaleString()}</TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <Badge variant="outline" className={`text-xs ${offer.discountPercent > 20 ? "bg-success/10 text-success border-success" : ""}`}>
                            {offer.perc_fipe}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <OfferAnalyticsCharts offers={offersWithScores} />
        </TabsContent>
      </Tabs>
    </div>
  );
}