import { Coins, Flame, Timer, TrendingUp } from "lucide-react";

export function ProtocolStatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <div className="rounded-xl border bg-black/20 border-border/40 backdrop-blur-md text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between p-6 pb-2">
          <h3 className="text-sm font-medium text-muted-foreground leading-none tracking-tight">Total Staked</h3>
          <Coins className="h-4 w-4 text-primary" />
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">145,000 SOL</div>
          <p className="text-xs text-muted-foreground mt-1">+2.5% from last epoch</p>
        </div>
      </div>
      
      <div className="rounded-xl border bg-black/20 border-border/40 backdrop-blur-md text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between p-6 pb-2">
          <h3 className="text-sm font-medium text-muted-foreground leading-none tracking-tight">Current APY</h3>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold text-green-500">7.45%</div>
          <p className="text-xs text-muted-foreground mt-1">Dynamic base APY</p>
        </div>
      </div>

      <div className="rounded-xl border bg-black/20 border-border/40 backdrop-blur-md text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between p-6 pb-2">
          <h3 className="text-sm font-medium text-muted-foreground leading-none tracking-tight">Reserve Buffer</h3>
          <Flame className="h-4 w-4 text-orange-500" />
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">2,400 SOL</div>
          <p className="text-xs text-muted-foreground mt-1">Available for quick exit</p>
        </div>
      </div>

      <div className="rounded-xl border bg-black/20 border-border/40 backdrop-blur-md text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between p-6 pb-2">
          <h3 className="text-sm font-medium text-muted-foreground leading-none tracking-tight">Epoch Progress</h3>
          <Timer className="h-4 w-4 text-blue-500" />
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">42%</div>
          <p className="text-xs text-muted-foreground mt-1">~1.2 days remaining</p>
        </div>
      </div>
    </div>
  );
}
