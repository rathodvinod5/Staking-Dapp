"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useAdmin } from "@/features/admin/useAdmin";
import { Loader2, ShieldAlert } from "lucide-react";
import { formatLamports, shortenAddress } from "@/lib/solana/utils";
import { formatDistanceToNow } from "date-fns";
import { useUIStore } from "@/lib/store/useStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { connected } = useWallet();
  const { isAdminMode } = useUIStore();
  const router = useRouter();
  
  const { globalTickets, isLoadingTickets, processTicket, processBatch, isProcessing } = useAdmin();

  useEffect(() => {
    // Basic protection - in a real app check standard admin pubkey logic on-chain
    if (!isAdminMode) {
      router.push("/");
    }
  }, [isAdminMode, router]);

  if (!isAdminMode || !connected) return null;

  return (
    <div className="flex flex-col gap-8 pb-20 w-full max-w-4xl mx-auto pt-10">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-br from-purple-400 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-purple-500" />
            Protocol Control Panel
          </h1>
          <p className="text-muted-foreground mt-2">Manage reserve balances and process unstake claims.</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
            onClick={processBatch}
            disabled={isProcessing || !globalTickets || globalTickets.length === 0}
          >
            Process All Pending
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border bg-purple-900/10 border-purple-500/20 text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <h3 className="text-sm font-medium text-purple-400 leading-none tracking-tight">Reserve Balance</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-3xl font-bold">2,400 SOL</div>
          </div>
        </div>
        
        <div className="rounded-xl border bg-indigo-900/10 border-indigo-500/20 text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <h3 className="text-sm font-medium text-indigo-400 leading-none tracking-tight">Pending Unstakes Total</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-3xl font-bold">1,540 SOL</div>
          </div>
        </div>
        
        <div className="rounded-xl border bg-rose-900/10 border-rose-500/20 text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <h3 className="text-sm font-medium text-rose-400 leading-none tracking-tight">Deficit / Epoch Req</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-3xl font-bold text-green-500">Safe</div>
            <p className="text-xs text-muted-foreground mt-1">Reserve covers all pending</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-black/40 backdrop-blur-xl text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Global Pending Tickets</h3>
          <p className="text-sm text-muted-foreground">Users waiting for their SOL from the protocol reserve.</p>
        </div>
        <div className="p-6 pt-0">
          {isLoadingTickets ? (
            <div className="py-12 text-center text-muted-foreground animate-pulse">Loading all protocol tickets...</div>
          ) : globalTickets?.length === 0 ? (
             <div className="py-12 text-center text-muted-foreground border border-dashed rounded-lg border-border/50">
               Queue is empty.
             </div>
          ) : (
            <div className="rounded-md border border-border/40 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-accent/20 text-left">
                    <th className="p-4 font-medium text-muted-foreground">Ticket ID</th>
                    <th className="p-4 font-medium text-muted-foreground">User</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Amount (SOL)</th>
                    <th className="p-4 font-medium text-muted-foreground">Age</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {globalTickets?.map((ticket) => (
                    <tr key={ticket.id} className="border-b border-border/20 last:border-0 hover:bg-accent/10 transition-colors">
                      <td className="p-4 font-mono text-muted-foreground">{shortenAddress(ticket.id, 4)}</td>
                      <td className="p-4 font-mono text-primary/80">{shortenAddress(ticket.user, 6)}</td>
                      <td className="p-4 font-mono text-right font-bold">{formatLamports(ticket.amount)}</td>
                      <td className="p-4 text-muted-foreground">{formatDistanceToNow(ticket.createdAt, { addSuffix: true })}</td>
                      <td className="p-4 text-right">
                        <button 
                           onClick={() => processTicket(ticket.id)}
                           disabled={isProcessing}
                           className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 px-3 bg-primary/20 text-primary hover:bg-primary/30"
                        >
                          {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Process"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-sm text-center text-muted-foreground/60">
        <p>Warning: Administrative actions directly modify protocol state and reserves.</p>
        <p>Do NOT process unstakes if reserve balance is less than the requested ticket amount.</p>
      </div>
      
    </div>
  );
}
