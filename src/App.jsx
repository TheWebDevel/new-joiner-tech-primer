import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HourDeck from './components/HourDeck'
import MobileNotice from './components/MobileNotice'
import PageLoadSlide from './slides/PageLoadSlide'
import LiveBrowserSlide from './slides/LiveBrowserSlide'
import BuildingBlocksSlide from './slides/BuildingBlocksSlide'
import CodeRevealSlide from './slides/CodeRevealSlide'
import FrameworksSlide from './slides/FrameworksSlide'
import FrameworkExamplesSlide from './slides/FrameworkExamplesSlide'
import FeelsSmartSlide from './slides/FeelsSmartSlide'
import ResponsiveDesignSlide from './slides/ResponsiveDesignSlide'
import FormValidationSlide from './slides/FormValidationSlide'
import FrontendScenariosSlide from './slides/FrontendScenariosSlide'
import Hour1RecapSlide from './slides/Hour1RecapSlide'
import Hour1QuizSlide from './slides/Hour1QuizSlide'
import ServerFlowSlide from './slides/ServerFlowSlide'
import ApiEndpointSlide from './slides/ApiEndpointSlide'
import DatabaseSlide from './slides/DatabaseSlide'
import DatabaseTypesSlide from './slides/DatabaseTypesSlide'
import RequestMethodsSlide from './slides/RequestMethodsSlide'
import StatusCodesSlide from './slides/StatusCodesSlide'
import JsonSlide from './slides/JsonSlide'
import BackendFrameworksSlide from './slides/BackendFrameworksSlide'
import AuthSlide from './slides/AuthSlide'
import AuthorizationSlide from './slides/AuthorizationSlide'
import ApiVariationsSlide from './slides/ApiVariationsSlide'
import Hour2ClueBoardSlide from './slides/Hour2ClueBoardSlide'
import DeploymentIntroSlide from './slides/DeploymentIntroSlide'
import EnvironmentsSlide from './slides/EnvironmentsSlide'
import CiCdPipelineSlide from './slides/CiCdPipelineSlide'
import CloudHostingSlide from './slides/CloudHostingSlide'
import InstancesSlide from './slides/InstancesSlide'
import ScalingSlide from './slides/ScalingSlide'
import CdnSlide from './slides/CdnSlide'
import ServerlessSlide from './slides/ServerlessSlide'
import DrRedundancySlide from './slides/DrRedundancySlide'
import ArchitectureGameSlide from './slides/ArchitectureGameSlide'
import DeploymentScenariosSlide from './slides/DeploymentScenariosSlide'
import Hour3RecapSlide from './slides/Hour3RecapSlide'
import Hour3MatchGameSlide from './slides/Hour3MatchGameSlide'
import LlmIntroSlide from './slides/LlmIntroSlide'
import TokensSlide from './slides/TokensSlide'
import ContextWindowSlide from './slides/ContextWindowSlide'
import HallucinationSlide from './slides/HallucinationSlide'
import RagSlide from './slides/RagSlide'
import ContextManagementSlide from './slides/ContextManagementSlide'
import CodingAgentSlide from './slides/CodingAgentSlide'
import SkillsSlide from './slides/SkillsSlide'
import BestPracticesSlide from './slides/BestPracticesSlide'
import AgentScenariosSlide from './slides/AgentScenariosSlide'
import Hour4RecapSlide from './slides/Hour4RecapSlide'
import Hour4MatchGameSlide from './slides/Hour4MatchGameSlide'
import RecapQuizSlide from './slides/RecapQuizSlide'

// `steps` = number of arrow-key-revealed fragments inside that slide.
// Arrow Right walks through a slide's fragments before advancing to the
// next slide; Arrow Left hides them in reverse before going back a slide.
// `section` drives the persistent top-left header in HourDeck.
// Each hour is its own independent deck (own tab, own numbering from 1),
// opened from the home page rather than one continuous show.
const hour1Slides = [
  { Component: PageLoadSlide, steps: 4, section: 'Hour 1 · Frontend' },
  { Component: LiveBrowserSlide, steps: 4, section: 'Hour 1 · Frontend' },
  { Component: BuildingBlocksSlide, steps: 3, section: 'Hour 1 · Frontend' },
  { Component: CodeRevealSlide, steps: 3, section: 'Hour 1 · Frontend' },
  { Component: FrameworksSlide, steps: 3, section: 'Hour 1 · Frontend' },
  { Component: FrameworkExamplesSlide, steps: 3, section: 'Hour 1 · Frontend' },
  { Component: FeelsSmartSlide, steps: 4, section: 'Hour 1 · Frontend' },
  { Component: ResponsiveDesignSlide, steps: 3, section: 'Hour 1 · Frontend' },
  { Component: FormValidationSlide, steps: 4, section: 'Hour 1 · Frontend' },
  { Component: FrontendScenariosSlide, steps: 6, section: 'Hour 1 · Frontend' },
  { Component: Hour1RecapSlide, steps: 0, section: 'Hour 1 · Recap' },
  { Component: Hour1QuizSlide, steps: 0, section: 'Hour 1 · Quiz' },
]

// Order follows one continuous arc: the request/response flow (overview),
// then the live API demo, then the three things that demo just showed
// without naming (method, status, JSON body) get named right away, then
// database/database types (the other half of the flow overview), then
// backend frameworks as a bridge (its own punchline namechecks routing,
// database access, AND security — the exact three things covered right
// before and right after it), then auth/authz, the GraphQL/WebSocket
// aside, then a clue-board game that closes the hour, doing the job of
// a recap and a terminology check without being a plain multiple-choice
// quiz.
const hour2Slides = [
  { Component: ServerFlowSlide, steps: 5, section: 'Hour 2 · Backend' },
  { Component: ApiEndpointSlide, steps: 3, section: 'Hour 2 · Backend' },
  { Component: RequestMethodsSlide, steps: 4, section: 'Hour 2 · Backend' },
  { Component: StatusCodesSlide, steps: 2, section: 'Hour 2 · Backend' },
  { Component: JsonSlide, steps: 4, section: 'Hour 2 · Backend' },
  { Component: DatabaseSlide, steps: 3, section: 'Hour 2 · Backend' },
  { Component: DatabaseTypesSlide, steps: 3, section: 'Hour 2 · Backend' },
  { Component: BackendFrameworksSlide, steps: 3, section: 'Hour 2 · Backend' },
  { Component: AuthSlide, steps: 2, section: 'Hour 2 · Backend' },
  { Component: AuthorizationSlide, steps: 2, section: 'Hour 2 · Backend' },
  { Component: ApiVariationsSlide, steps: 3, section: 'Hour 2 · Backend' },
  { Component: Hour2ClueBoardSlide, steps: 0, section: 'Hour 2 · Game' },
]

// Order: from "it works on my laptop" to a live URL (deployment), through the
// rooms code passes through on the way there (environments), the machine
// that now runs it automatically (CI/CD pipeline), where each layer of the
// app actually lives (cloud hosting), which immediately splits into two
// threads: the frontend side gets its own lever on speed (CDN) right away,
// then the backend side gets its own block, one running copy (instances),
// what happens under a traffic spike (scaling), and a different always-on/
// asleep tradeoff for running that same backend (serverless). Then the
// "what if it breaks" vocabulary (redundancy, backup, DR) that the
// architecture game lets you actually go break, immediately followed by the
// same ideas applied as BA-facing tickets (still that game, just BA-shaped),
// a recap of all twelve terms, and closing on a match-the-following round
// that tests the whole hour's vocabulary at once. Sections run in one clean
// pass, Deployment, then Game, then Recap, then Match, with no doubling back.
const hour3Slides = [
  { Component: DeploymentIntroSlide, steps: 4, section: 'Hour 3 · Deployment' },
  { Component: EnvironmentsSlide, steps: 3, section: 'Hour 3 · Deployment' },
  { Component: CiCdPipelineSlide, steps: 1, section: 'Hour 3 · Deployment' },
  { Component: CloudHostingSlide, steps: 3, section: 'Hour 3 · Deployment' },
  { Component: CdnSlide, steps: 1, section: 'Hour 3 · Deployment' },
  { Component: InstancesSlide, steps: 2, section: 'Hour 3 · Deployment' },
  { Component: ScalingSlide, steps: 1, section: 'Hour 3 · Deployment' },
  { Component: ServerlessSlide, steps: 2, section: 'Hour 3 · Deployment' },
  { Component: DrRedundancySlide, steps: 3, section: 'Hour 3 · Deployment' },
  { Component: ArchitectureGameSlide, steps: 4, section: 'Hour 3 · Game' },
  { Component: DeploymentScenariosSlide, steps: 3, section: 'Hour 3 · Game' },
  { Component: Hour3RecapSlide, steps: 0, section: 'Hour 3 · Recap' },
  { Component: Hour3MatchGameSlide, steps: 0, section: 'Hour 3 · Match' },
]

// Arc, two blocks: mechanics, then a problem/fix pair, then application.
//
// Block 1, mechanics of the model itself: LLM intro (behavior first, names
// LLM + prompt, ends "closed-book, straight from memory, nothing was
// looked up") -> tokens (what it actually reads, bridges straight into
// embeddings same slide, since a token can't be searched but its embedding
// can, ends by naming both the coming size-limit thread AND the coming
// closed-book-fix thread in one line) -> context window (what it can still
// see, what falls off, and why there's a size limit at all, compute cost,
// pays off the "limits" half of tokens' closing line).
//
// Block 2, a concrete problem then its fix, deliberately adjacent so RAG's
// "same closed-book question from last slide" is literally true: hallucination
// (closed-book, confident but wrong, pays off the other half of tokens'
// closing line) -> RAG (same question, open-book fix, explicit closed-book
// vs open-book contrast). Context management comes AFTER RAG, not before
// it, on purpose: it generalizes "retrieved context" into one of four
// layers using the RAG demo the audience just watched as a concrete,
// already-understood example ("that open book from last slide") rather
// than naming an abstract category before RAG has explained what filling
// it even means. Don't move this ahead of RAG again without re-checking
// ContextManagementSlide's opening line, which assumes RAG just happened.
//
// Block 3, applying all of it: coding agent (the shared task tracker
// example returns, a ticket becomes a plan, tool calls, and a real diff,
// closing on naming the agent loop, reusing "tool use" from the same slide
// instead of a separate one) -> skills (same shape of ticket, same agent,
// but now its plan step pulls from a saved checklist instead of
// improvising one, so "skill" lands as a refinement of the plan step just
// named) -> best practices (the do/don't version of what a BA controls:
// sessions, ticket clarity, context, reusing a skill, review) -> agent
// scenarios (those same practices as BA-facing tickets to react to) ->
// recap -> match game closer. Reuses the shared task tracker example per
// CLAUDE.md, but only from the coding-agent block onward, not in block 1
// or 2 (see feedback-task-tracker-scope memory).
const hour4Slides = [
  { Component: LlmIntroSlide, steps: 4, section: 'Hour 4 · AI / LLMs' },
  { Component: TokensSlide, steps: 5, section: 'Hour 4 · AI / LLMs' },
  { Component: ContextWindowSlide, steps: 9, section: 'Hour 4 · AI / LLMs' },
  { Component: HallucinationSlide, steps: 4, section: 'Hour 4 · AI / LLMs' },
  { Component: RagSlide, steps: 6, section: 'Hour 4 · AI / LLMs' },
  { Component: ContextManagementSlide, steps: 6, section: 'Hour 4 · AI / LLMs' },
  { Component: CodingAgentSlide, steps: 8, section: 'Hour 4 · Coding Agents' },
  { Component: SkillsSlide, steps: 6, section: 'Hour 4 · Coding Agents' },
  { Component: BestPracticesSlide, steps: 6, section: 'Hour 4 · Coding Agents' },
  { Component: AgentScenariosSlide, steps: 3, section: 'Hour 4 · Coding Agents' },
  { Component: Hour4RecapSlide, steps: 0, section: 'Hour 4 · Recap' },
  { Component: Hour4MatchGameSlide, steps: 0, section: 'Hour 4 · Match' },
]

// Standalone recap deck, one slide, opened from the home page like an hour
// but not numbered as one: a quick 4-question check spanning Hour 1
// (frontend) and Hour 2 (backend) rather than belonging to either.
const recapSlides = [{ Component: RecapQuizSlide, steps: 0, section: 'Recap · Frontend + Backend' }]

function App() {
  return (
    <>
      <MobileNotice />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hour/1" element={<HourDeck slides={hour1Slides} />} />
        <Route path="/hour/2" element={<HourDeck slides={hour2Slides} />} />
        <Route path="/hour/3" element={<HourDeck slides={hour3Slides} />} />
        <Route path="/hour/4" element={<HourDeck slides={hour4Slides} />} />
        <Route path="/recap" element={<HourDeck slides={recapSlides} />} />
      </Routes>
    </>
  )
}

export default App
