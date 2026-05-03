import React, { useState } from 'react';
import { ExternalLink, Clock, Zap, TrendingUp, X, ArrowLeft } from 'lucide-react';

const FULL_NEWS = [
  {
    id: 1,
    title: 'Bitcoin ETFs See Record $1.5B Inflows in Single Day',
    description: 'Spot Bitcoin ETFs recorded their largest single-day inflow ever, signaling massive institutional confidence in crypto markets heading into Q3.',
    fullArticle: `Spot Bitcoin ETFs in the United States recorded an unprecedented $1.5 billion in net inflows in a single trading session, shattering all previous records. This comes as major asset managers like BlackRock and Fidelity continue to see robust demand from institutional clients.\n\nAnalysts attribute this surge to a combination of factors: renewed risk appetite in global markets, Bitcoin's upcoming halving cycle, and growing regulatory clarity in the US. The inflow figure surpasses the previous record set during Bitcoin's last bull run by nearly 40%.\n\nInstitutional players view Bitcoin ETFs as a safer, more regulated gateway to crypto exposure compared to direct ownership — a sentiment now clearly reflected in the numbers. Some market observers believe this could signal the beginning of a sustained institutional accumulation phase.`,
    source: 'CryptoNews',
    time: '2h ago',
    tag: 'Bitcoin',
    tagColor: 'bg-amber-500/10 text-amber-400',
    accent: 'from-amber-500/10 to-transparent',
    border: 'hover:border-amber-500/30',
    featured: true,
  },
  {
    id: 2,
    title: 'Ethereum Pectra Upgrade Deployed Successfully on Mainnet',
    description: 'The long-awaited Pectra upgrade went live on Ethereum mainnet, bringing account abstraction improvements and boosting validator efficiency.',
    fullArticle: `Ethereum's Pectra upgrade has been successfully deployed to mainnet after months of testing on testnets. The upgrade is considered one of the most significant milestones for Ethereum's roadmap since the Merge.\n\nKey improvements include EIP-7702, which introduces account abstraction at the protocol level — allowing users to turn their EOA wallets into smart contract wallets temporarily. This enables features like gas sponsorship, batched transactions, and social recovery.\n\nValidator efficiency has also been boosted with new consolidation features that allow validators to hold up to 2,048 ETH instead of the standard 32 ETH, reducing the number of validators needed and improving network throughput. The Ethereum community has reacted positively, with ETH price showing a 4% uptick in the hours following the successful deployment.`,
    source: 'CoinDesk',
    time: '5h ago',
    tag: 'Ethereum',
    tagColor: 'bg-blue-500/10 text-blue-400',
    accent: 'from-blue-500/10 to-transparent',
    border: 'hover:border-blue-500/30',
  },
  {
    id: 3,
    title: 'Solana Hits New All-Time High in Daily Active Addresses',
    description: 'Solana surpassed 2.5 million daily active addresses, driven by DeFi activity and a surge in on-chain gaming and NFT trading volumes.',
    fullArticle: `Solana's network activity has reached new heights, with the blockchain recording over 2.5 million daily active addresses — a new all-time high that underscores the chain's growing ecosystem.\n\nThe surge is largely driven by an explosion in on-chain gaming applications, NFT trading, and DeFi protocols built on Solana's high-throughput infrastructure. Popular DEXes like Raydium and Orca saw record trading volumes, while emerging GameFi projects attracted hundreds of thousands of new wallets.\n\nSolana's sub-second finality and near-zero transaction fees continue to be a major draw for developers and users alike. The network has also maintained strong uptime records in recent months, addressing one of its historical concerns around reliability.`,
    source: 'Decrypt',
    time: '12h ago',
    tag: 'Solana',
    tagColor: 'bg-purple-500/10 text-purple-400',
    accent: 'from-purple-500/10 to-transparent',
    border: 'hover:border-purple-500/30',
  },
  {
    id: 4,
    title: 'SEC Approves New Crypto Custody Rules for Banks',
    description: 'US banks can now hold crypto assets for clients under new SEC guidelines, opening the floodgates for institutional custody services.',
    fullArticle: `The US Securities and Exchange Commission has approved a new set of guidelines that explicitly allow banks and financial institutions to offer crypto custody services to their clients. This marks a major regulatory shift that could dramatically accelerate institutional adoption.\n\nPreviously, banks were discouraged from holding crypto on behalf of clients due to accounting rules that required them to record crypto as a liability on their balance sheets. The new rules create a clear framework for risk management, segregation of assets, and reporting standards.\n\nIndustry observers expect this to trigger a wave of new custody products from major banks including JPMorgan, Goldman Sachs, and BNY Mellon, potentially bringing trillions of dollars of institutional capital closer to the crypto ecosystem.`,
    source: 'Bloomberg Crypto',
    time: '1d ago',
    tag: 'Regulation',
    tagColor: 'bg-emerald-500/10 text-emerald-400',
    accent: 'from-emerald-500/10 to-transparent',
    border: 'hover:border-emerald-500/30',
  },
  {
    id: 5,
    title: 'Cardano Smart Contract Volume Spikes 300% in April',
    description: "ADA-based DeFi protocols saw a 3x increase in volume as Cardano's ecosystem matures and liquidity pools deepen across major DEXes.",
    fullArticle: `Cardano's DeFi ecosystem experienced a dramatic 300% increase in smart contract volume throughout April, signaling a maturation of the blockchain's on-chain economy. The surge was led by leading Cardano DEXes such as Minswap, WingRiders, and SundaeSwap.\n\nLiquidity pool depths have expanded significantly over the past quarter, driven by new liquidity mining incentives and the launch of several new lending protocols on the network. Total Value Locked (TVL) on Cardano crossed $500 million for the first time.\n\nADA staking also saw increased participation, with over 70% of circulating supply now staked — one of the highest staking ratios among major proof-of-stake blockchains. The Cardano Foundation attributed the growth to ongoing developer education initiatives and improved tooling for smart contract developers.`,
    source: 'DeFi Pulse',
    time: '1d ago',
    tag: 'DeFi',
    tagColor: 'bg-teal-500/10 text-teal-400',
    accent: 'from-teal-500/10 to-transparent',
    border: 'hover:border-teal-500/30',
  },
  {
    id: 6,
    title: 'Polkadot Parachain Auctions Resume With 12 New Projects',
    description: "DOT's parachain slot auctions are back, featuring 12 new projects focused on privacy-preserving finance and cross-chain interoperability.",
    fullArticle: `Polkadot's parachain slot auctions have resumed with 12 new projects competing for slots on the relay chain. This latest batch focuses heavily on privacy-preserving finance applications and advanced cross-chain interoperability protocols.\n\nAmong the standout projects is a zero-knowledge proof layer designed to allow private transactions across any Polkadot parachain, and a cross-chain bridge aggregator that unifies liquidity from Ethereum, Cosmos, and Polkadot ecosystems.\n\nThe Polkadot community treasury has also approved funding for several developer grants tied to the new parachains, and the Web3 Foundation is backing three of the projects with direct technical support. DOT token holders participated in crowdloans totaling over $180 million equivalent in DOT contributions.`,
    source: 'The Block',
    time: '2d ago',
    tag: 'Polkadot',
    tagColor: 'bg-pink-500/10 text-pink-400',
    accent: 'from-pink-500/10 to-transparent',
    border: 'hover:border-pink-500/30',
  },
];

// ─── Article Modal ────────────────────────────────────────────────────────────
const ArticleModal = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Panel */}
        <div
          className="glass rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col border border-white/10 shadow-2xl animate-in"
          style={{ animation: 'modalIn 0.22s cubic-bezier(.22,1,.36,1)' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="flex items-start justify-between p-6 border-b border-white/5 gap-4 shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${article.tagColor}`}>
                {article.tag}
              </span>
              <span className="flex items-center gap-1 text-muted text-xs">
                <Clock size={11} /> {article.time}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-muted hover:text-text transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto p-6 space-y-4">
            <h2 className="text-xl font-bold text-text leading-snug">{article.title}</h2>
            <p className="text-sm text-primary/80 font-medium border-l-2 border-primary/40 pl-3 italic leading-relaxed">
              {article.description}
            </p>
            <div className="h-px bg-white/5" />
            {article.fullArticle.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm text-muted leading-relaxed">{para}</p>
            ))}
          </div>

          {/* Footer */}
          <div className="shrink-0 px-6 py-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-medium text-muted">Source: {article.source}</span>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
            >
              <ArrowLeft size={14} /> Back to News
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="glass rounded-2xl p-6 animate-pulse space-y-4">
    <div className="flex items-start justify-between gap-2">
      <div className="h-5 w-16 bg-white/10 rounded-full" />
      <div className="h-4 w-12 bg-white/10 rounded" />
    </div>
    <div className="space-y-2">
      <div className="h-5 w-full bg-white/10 rounded" />
      <div className="h-5 w-3/4 bg-white/10 rounded" />
    </div>
    <div className="space-y-2">
      <div className="h-4 w-full bg-white/10 rounded" />
      <div className="h-4 w-2/3 bg-white/10 rounded" />
    </div>
    <div className="flex justify-between">
      <div className="h-4 w-24 bg-white/10 rounded" />
      <div className="h-4 w-16 bg-white/10 rounded" />
    </div>
  </div>
);

// ─── News Page ────────────────────────────────────────────────────────────────
const News = () => {
  const isLoading = false;
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);

  const openArticle = (article) => {
    setSelectedArticle(article);
    setHighlightedId(article.id);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text">Crypto News</h2>
            <p className="text-muted text-sm mt-1">Latest from the crypto world</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Zap size={14} className="text-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">Live Feed</span>
          </div>
        </div>

        {/* Featured story */}
        {!isLoading && (
          <div
            onClick={() => openArticle(FULL_NEWS[0])}
            className={`glass rounded-2xl p-6 border cursor-pointer group transition-all duration-300
              hover:shadow-[0_0_40px_rgba(59,130,246,0.12)] bg-gradient-to-br from-primary/5 to-transparent
              ${highlightedId === FULL_NEWS[0].id
                ? 'border-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.18)] scale-[1.005]'
                : 'border-white/5 hover:border-primary/20'
              }`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                <TrendingUp size={12} /> Featured
              </span>
              <span className="flex items-center gap-1 text-muted text-xs">
                <Clock size={12} /> {FULL_NEWS[0].time}
              </span>
            </div>
            <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors leading-snug mb-2">
              {FULL_NEWS[0].title}
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-4">{FULL_NEWS[0].description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">{FULL_NEWS[0].source}</span>
              <button
                onClick={e => { e.stopPropagation(); openArticle(FULL_NEWS[0]); }}
                className="flex items-center gap-1 text-xs text-primary hover:text-blue-300 transition-colors"
              >
                Read more <ExternalLink size={12} />
              </button>
            </div>
          </div>
        )}

        {/* News grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : FULL_NEWS.slice(1).map(article => (
                <div
                  key={article.id}
                  onClick={() => openArticle(article)}
                  className={`glass rounded-2xl p-5 cursor-pointer group border transition-all duration-300
                    hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                    bg-gradient-to-br ${article.accent}
                    ${highlightedId === article.id
                      ? `border-white/30 scale-[1.02] shadow-[0_8px_32px_rgba(0,0,0,0.3)]`
                      : `border-white/5 ${article.border}`
                    }`}
                >
                  {/* Tag + Time */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${article.tagColor}`}>
                      {article.tag}
                    </span>
                    <span className="flex items-center gap-1 text-muted text-xs shrink-0">
                      <Clock size={11} /> {article.time}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-text group-hover:text-primary transition-colors leading-snug mb-2 text-sm">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted text-xs leading-relaxed line-clamp-3 mb-4">
                    {article.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted">{article.source}</span>
                    <button
                      onClick={e => { e.stopPropagation(); openArticle(article); }}
                      className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 hover:gap-2"
                    >
                      Read more <ExternalLink size={11} />
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Modal */}
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </>
  );
};

export default News;
