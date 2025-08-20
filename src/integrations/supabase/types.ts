export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      areas: {
        Row: {
          cor: string
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
          updated_at: string | null
        }
        Insert: {
          cor?: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
          updated_at?: string | null
        }
        Update: {
          cor?: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      carros: {
        Row: {
          cor: string
          fipe: string
          id: number
          km: number
          margem: number
          mod: string
          modelo: string
          perc_fipe: string
          placa: string
          vlr: number
        }
        Insert: {
          cor: string
          fipe: string
          id?: number
          km: number
          margem: number
          mod: string
          modelo: string
          perc_fipe: string
          placa: string
          vlr: number
        }
        Update: {
          cor?: string
          fipe?: string
          id?: number
          km?: number
          margem?: number
          mod?: string
          modelo?: string
          perc_fipe?: string
          placa?: string
          vlr?: number
        }
        Relationships: []
      }
      clientes: {
        Row: {
          created_at: string
          data_cadastro: string
          data_primeira_compra: string | null
          data_ultima_compra: string | null
          email: string | null
          empresa: string | null
          endereco: string | null
          id: string
          nome: string
          observacoes: string | null
          quantidade_compras: number | null
          regiao: string | null
          status: string
          telefone: string | null
          updated_at: string
          user_id: string
          valor_total_gasto: number | null
          whatsapp: string | null
        }
        Insert: {
          created_at?: string
          data_cadastro?: string
          data_primeira_compra?: string | null
          data_ultima_compra?: string | null
          email?: string | null
          empresa?: string | null
          endereco?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          quantidade_compras?: number | null
          regiao?: string | null
          status?: string
          telefone?: string | null
          updated_at?: string
          user_id: string
          valor_total_gasto?: number | null
          whatsapp?: string | null
        }
        Update: {
          created_at?: string
          data_cadastro?: string
          data_primeira_compra?: string | null
          data_ultima_compra?: string | null
          email?: string | null
          empresa?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          quantidade_compras?: number | null
          regiao?: string | null
          status?: string
          telefone?: string | null
          updated_at?: string
          user_id?: string
          valor_total_gasto?: number | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      configuracoes: {
        Row: {
          account_status: string | null
          area_principal_id: string | null
          bio: string | null
          created_at: string | null
          email: string
          endereco: string | null
          nome: string | null
          nome_empresa: string | null
          phone: string | null
          plano: string | null
          position: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          segmento: string | null
          status: string | null
          ultimo_login: string | null
          updated_at: string | null
          user_id: string
          whatsapp_number: string | null
        }
        Insert: {
          account_status?: string | null
          area_principal_id?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          endereco?: string | null
          nome?: string | null
          nome_empresa?: string | null
          phone?: string | null
          plano?: string | null
          position?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          segmento?: string | null
          status?: string | null
          ultimo_login?: string | null
          updated_at?: string | null
          user_id: string
          whatsapp_number?: string | null
        }
        Update: {
          account_status?: string | null
          area_principal_id?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          endereco?: string | null
          nome?: string | null
          nome_empresa?: string | null
          phone?: string | null
          plano?: string | null
          position?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          segmento?: string | null
          status?: string | null
          ultimo_login?: string | null
          updated_at?: string | null
          user_id?: string
          whatsapp_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configuracoes_area_principal_id_fkey"
            columns: ["area_principal_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
        ]
      }
      contas_receber_pagar: {
        Row: {
          cliente_id: string | null
          created_at: string | null
          data_pagamento: string | null
          data_vencimento: string
          descricao: string
          id: string
          observacoes: string | null
          pedido_id: string | null
          status: string | null
          tipo: string
          updated_at: string | null
          user_id: string
          valor_pago: number | null
          valor_total: number
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento: string
          descricao: string
          id?: string
          observacoes?: string | null
          pedido_id?: string | null
          status?: string | null
          tipo: string
          updated_at?: string | null
          user_id: string
          valor_pago?: number | null
          valor_total: number
        }
        Update: {
          cliente_id?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string
          descricao?: string
          id?: string
          observacoes?: string | null
          pedido_id?: string | null
          status?: string | null
          tipo?: string
          updated_at?: string | null
          user_id?: string
          valor_pago?: number | null
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "contas_receber_pagar_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_receber_pagar_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      conversas_whatsapp: {
        Row: {
          anexos: Json | null
          area: string
          comentarios: Json | null
          comentarios_internos: Json | null
          created_at: string
          grupo: string
          id: string
          mensagem: string
          mensagens_whatsapp: Json | null
          remetente: string
          resumo_ia: string | null
          resumo_ia_updated_at: string | null
          status: string
          tags: string[] | null
          updated_at: string
          user_id: string
          usuario_responsavel: string
          whatsapp_instance_id: string
        }
        Insert: {
          anexos?: Json | null
          area: string
          comentarios?: Json | null
          comentarios_internos?: Json | null
          created_at?: string
          grupo: string
          id?: string
          mensagem: string
          mensagens_whatsapp?: Json | null
          remetente: string
          resumo_ia?: string | null
          resumo_ia_updated_at?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string
          user_id: string
          usuario_responsavel: string
          whatsapp_instance_id: string
        }
        Update: {
          anexos?: Json | null
          area?: string
          comentarios?: Json | null
          comentarios_internos?: Json | null
          created_at?: string
          grupo?: string
          id?: string
          mensagem?: string
          mensagens_whatsapp?: Json | null
          remetente?: string
          resumo_ia?: string | null
          resumo_ia_updated_at?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string
          user_id?: string
          usuario_responsavel?: string
          whatsapp_instance_id?: string
        }
        Relationships: []
      }
      historico_tarefas: {
        Row: {
          acao: string
          campo_alterado: string | null
          created_at: string | null
          id: string
          tarefa_id: string
          user_id: string
          valor_anterior: string | null
          valor_novo: string | null
        }
        Insert: {
          acao: string
          campo_alterado?: string | null
          created_at?: string | null
          id?: string
          tarefa_id: string
          user_id: string
          valor_anterior?: string | null
          valor_novo?: string | null
        }
        Update: {
          acao?: string
          campo_alterado?: string | null
          created_at?: string | null
          id?: string
          tarefa_id?: string
          user_id?: string
          valor_anterior?: string | null
          valor_novo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historico_tarefas_tarefa_id_fkey"
            columns: ["tarefa_id"]
            isOneToOne: false
            referencedRelation: "tarefas"
            referencedColumns: ["id"]
          },
        ]
      }
      metas_sistema: {
        Row: {
          created_at: string
          id: string
          nome: string
          periodo: string
          tipo: string
          updated_at: string
          user_id: string
          valor_meta: number
        }
        Insert: {
          created_at?: string
          id?: string
          nome: string
          periodo?: string
          tipo: string
          updated_at?: string
          user_id: string
          valor_meta: number
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
          periodo?: string
          tipo?: string
          updated_at?: string
          user_id?: string
          valor_meta?: number
        }
        Relationships: []
      }
      pedidos: {
        Row: {
          agendamento_data: string | null
          cliente: string
          cliente_id: string | null
          created_at: string
          etapa_atual: string | null
          forma_pgto: string | null
          frete: number | null
          id: string
          observacoes_producao: string | null
          prazo_entrega: string | null
          produtos: Json
          status: string | null
          total: number
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agendamento_data?: string | null
          cliente: string
          cliente_id?: string | null
          created_at?: string
          etapa_atual?: string | null
          forma_pgto?: string | null
          frete?: number | null
          id?: string
          observacoes_producao?: string | null
          prazo_entrega?: string | null
          produtos: Json
          status?: string | null
          total: number
          type?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agendamento_data?: string | null
          cliente?: string
          cliente_id?: string | null
          created_at?: string
          etapa_atual?: string | null
          forma_pgto?: string | null
          frete?: number | null
          id?: string
          observacoes_producao?: string | null
          prazo_entrega?: string | null
          produtos?: Json
          status?: string | null
          total?: number
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos: {
        Row: {
          ativo: boolean
          categoria: string | null
          codigo_produto: string | null
          cores_disponiveis: string[] | null
          created_at: string
          descricao: string | null
          duracao: number | null
          estoque: number | null
          fornecedor: string | null
          id: string
          imagem_url: string | null
          margem_lucro: number | null
          nome: string
          peso: number | null
          preco: number
          subcategoria: string | null
          tamanhos_disponiveis: string[] | null
          tempo_producao_dias: number | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ativo?: boolean
          categoria?: string | null
          codigo_produto?: string | null
          cores_disponiveis?: string[] | null
          created_at?: string
          descricao?: string | null
          duracao?: number | null
          estoque?: number | null
          fornecedor?: string | null
          id?: string
          imagem_url?: string | null
          margem_lucro?: number | null
          nome: string
          peso?: number | null
          preco: number
          subcategoria?: string | null
          tamanhos_disponiveis?: string[] | null
          tempo_producao_dias?: number | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ativo?: boolean
          categoria?: string | null
          codigo_produto?: string | null
          cores_disponiveis?: string[] | null
          created_at?: string
          descricao?: string | null
          duracao?: number | null
          estoque?: number | null
          fornecedor?: string | null
          id?: string
          imagem_url?: string | null
          margem_lucro?: number | null
          nome?: string
          peso?: number | null
          preco?: number
          subcategoria?: string | null
          tamanhos_disponiveis?: string[] | null
          tempo_producao_dias?: number | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tarefas: {
        Row: {
          anexos: Json | null
          categoria: string | null
          colaboradores: string[] | null
          created_at: string
          data_conclusao: string | null
          dependencias: string[] | null
          descricao: string | null
          id: string
          pedido_id: string | null
          pontuacao_dificuldade: number | null
          prazo: string | null
          prioridade: string
          progresso: number | null
          recorrencia: Json | null
          responsavel: string | null
          status: string
          tags: string[] | null
          tempo_estimado: number | null
          tempo_gasto: number | null
          titulo: string
          updated_at: string
          user_id: string
        }
        Insert: {
          anexos?: Json | null
          categoria?: string | null
          colaboradores?: string[] | null
          created_at?: string
          data_conclusao?: string | null
          dependencias?: string[] | null
          descricao?: string | null
          id?: string
          pedido_id?: string | null
          pontuacao_dificuldade?: number | null
          prazo?: string | null
          prioridade?: string
          progresso?: number | null
          recorrencia?: Json | null
          responsavel?: string | null
          status?: string
          tags?: string[] | null
          tempo_estimado?: number | null
          tempo_gasto?: number | null
          titulo: string
          updated_at?: string
          user_id: string
        }
        Update: {
          anexos?: Json | null
          categoria?: string | null
          colaboradores?: string[] | null
          created_at?: string
          data_conclusao?: string | null
          dependencias?: string[] | null
          descricao?: string | null
          id?: string
          pedido_id?: string | null
          pontuacao_dificuldade?: number | null
          prazo?: string | null
          prioridade?: string
          progresso?: number | null
          recorrencia?: Json | null
          responsavel?: string | null
          status?: string
          tags?: string[] | null
          tempo_estimado?: number | null
          tempo_gasto?: number | null
          titulo?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tarefas_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      transacoes_financeiras: {
        Row: {
          categoria: string | null
          cliente_id: string | null
          created_at: string
          data_transacao: string
          descricao: string
          id: string
          metodo_pagamento: string | null
          pedido_id: string | null
          status: string
          tipo: string
          updated_at: string
          user_id: string
          valor: number
        }
        Insert: {
          categoria?: string | null
          cliente_id?: string | null
          created_at?: string
          data_transacao?: string
          descricao: string
          id?: string
          metodo_pagamento?: string | null
          pedido_id?: string | null
          status?: string
          tipo: string
          updated_at?: string
          user_id: string
          valor: number
        }
        Update: {
          categoria?: string | null
          cliente_id?: string | null
          created_at?: string
          data_transacao?: string
          descricao?: string
          id?: string
          metodo_pagamento?: string | null
          pedido_id?: string | null
          status?: string
          tipo?: string
          updated_at?: string
          user_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "transacoes_financeiras_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transacoes_financeiras_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      user_areas: {
        Row: {
          area_id: string
          created_at: string | null
          id: string
          is_primary: boolean | null
          user_id: string
        }
        Insert: {
          area_id: string
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          user_id: string
        }
        Update: {
          area_id?: string
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_areas_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          role: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name: string
          phone?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calcular_comparacao_periodo: {
        Args: { periodo_dias?: number; tipo_calculo: string; user_uuid: string }
        Returns: {
          percentual_mudanca: number
          valor_anterior: number
          valor_atual: number
        }[]
      }
      calcular_lucro_mensal: {
        Args: { ano?: number; mes?: number }
        Returns: number
      }
      calcular_metricas_financeiras: {
        Args: { ano_param?: number; mes_param?: number; user_uuid: string }
        Returns: {
          contas_pagar: number
          contas_receber: number
          despesa_total: number
          fluxo_caixa: number
          lucro: number
          margem_lucro: number
          receita_total: number
        }[]
      }
      calcular_produtividade_usuario: {
        Args: { periodo_dias?: number; user_uuid: string }
        Returns: {
          produtividade_score: number
          tarefas_concluidas: number
          tarefas_em_atraso: number
          tempo_total_gasto: number
        }[]
      }
      calcular_total_pedido: {
        Args: { produtos_json: Json }
        Returns: number
      }
      get_account_status: {
        Args: { _user_id: string }
        Returns: string
      }
      get_farm_user_id: {
        Args: { farm_id: string }
        Returns: string
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: string
      }
      is_account_approved: {
        Args: { _user_id: string }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
      is_user_approved: {
        Args: { user_id: string }
        Returns: boolean
      }
      marcar_conta_como_paga: {
        Args: { conta_id: string; valor_pago_param?: number }
        Returns: undefined
      }
      user_has_access_to: {
        Args: { _feature: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "user"
        | "designer"
        | "financeiro"
        | "vendedor"
        | "producao"
      subscription_status: "active" | "canceled" | "expired" | "trial"
      subscription_tier: "free" | "basic" | "pro" | "business"
      task_priority: "low" | "medium" | "high" | "urgent"
      task_status: "pending" | "in_progress" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "user",
        "designer",
        "financeiro",
        "vendedor",
        "producao",
      ],
      subscription_status: ["active", "canceled", "expired", "trial"],
      subscription_tier: ["free", "basic", "pro", "business"],
      task_priority: ["low", "medium", "high", "urgent"],
      task_status: ["pending", "in_progress", "completed", "cancelled"],
    },
  },
} as const
