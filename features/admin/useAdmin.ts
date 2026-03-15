"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useProgram } from "@/lib/solana/ProgramProvider";

export function useAdmin() {
  const { program } = useProgram();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  // In a real app, this would fetch all tickets from the program where status == pending
  const { data: globalTickets, isLoading: isLoadingTickets } = useQuery({
    queryKey: ["admin-tickets"],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 800));
      return [
        {
          id: "tkt123456789abc",
          amount: 15.5 * 1e9,
          user: "UserA...3jk2",
          status: "pending",
          createdAt: Date.now() - 3600000,
        },
        {
          id: "tkt456789012def",
          amount: 42.1 * 1e9,
          user: "UserB...9x1a",
          status: "pending",
          createdAt: Date.now() - 7200000,
        },
      ];
    },
    enabled: true,
  });

  const processTicket = async (ticketId: string) => {
    try {
      setIsProcessing(true);

      // Mock admin processing
      await new Promise((res) => setTimeout(res, 2000));

      window.alert(`Ticket ${ticketId} processed successfully! Sent to user.`);
      queryClient.invalidateQueries({ queryKey: ["admin-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["protocol-stats"] });
    } catch (err: any) {
      window.alert("Please connect as admin to process tickets.");
      return;
    } finally {
      setIsProcessing(false);
    }
  };

  const processBatch = async () => {
    try {
      setIsProcessing(true);

      await new Promise((res) => setTimeout(res, 3000));

      window.alert("Successfully processed batched unstakes");
      queryClient.invalidateQueries({ queryKey: ["admin-tickets"] });
    } catch (err: any) {
      window.alert(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    globalTickets,
    isLoadingTickets,
    processTicket,
    processBatch,
    isProcessing,
  };
}
