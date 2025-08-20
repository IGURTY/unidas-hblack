import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";

const WEBHOOK_URL = "https://webhook.hblackbot.online/webhook/importacaopdf";

export default function ImportarPDF() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast.error("Selecione um arquivo PDF.");
      return;
    }
    if (file.type !== "application/pdf") {
      toast.error("O arquivo deve ser um PDF.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Falha ao enviar o PDF.");
      toast.success("PDF enviado com sucesso!");
      fileInputRef.current.value = "";
    } catch (err) {
      toast.error("Erro ao enviar o PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-primary" />
            Importar PDF
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              disabled={loading}
              className="w-full"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar PDF"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}