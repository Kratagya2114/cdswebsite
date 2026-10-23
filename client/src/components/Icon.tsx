import type { IconType } from 'react-icons';
import * as Lu from 'react-icons/lu';

const map: Record<string, IconType> = {
  globe: Lu.LuGlobe, layers: Lu.LuLayers, smartphone: Lu.LuSmartphone, palette: Lu.LuPalette, pen: Lu.LuPenTool,
  flask: Lu.LuFlaskConical, bot: Lu.LuBot, sparkles: Lu.LuSparkles, factory: Lu.LuFactory, cart: Lu.LuShoppingCart,
  search: Lu.LuSearch, megaphone: Lu.LuMegaphone, code: Lu.LuCode, coffee: Lu.LuCoffee, chart: Lu.LuChartColumn,
  target: Lu.LuTarget, wrench: Lu.LuWrench, puzzle: Lu.LuPuzzle, zap: Lu.LuZap, shield: Lu.LuShieldCheck,
  handshake: Lu.LuHandshake, trending: Lu.LuTrendingUp, stethoscope: Lu.LuStethoscope, package: Lu.LuPackage,
  shirt: Lu.LuShirt, wallet: Lu.LuWallet, receipt: Lu.LuReceiptText, heart: Lu.LuHeart, party: Lu.LuPartyPopper,
  rocket: Lu.LuRocket, message: Lu.LuMessageCircle, close: Lu.LuX, send: Lu.LuSend, menu: Lu.LuMenu,
  star: Lu.LuStar, up: Lu.LuArrowUp, down: Lu.LuArrowDown, right: Lu.LuArrowRight, upright: Lu.LuArrowUpRight, left: Lu.LuArrowLeft,
};

export default function Icon({ name, className, size }: { name: string; className?: string; size?: number | string }) {
  const C = map[name] ?? Lu.LuSparkles;
  return <C className={`ico ${className ?? ''}`} size={size} aria-hidden="true" focusable="false" />;
}
