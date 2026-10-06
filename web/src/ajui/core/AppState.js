import { DocumentState } from '../document/DocumentState.js';
import { CommandStack } from '../commands/CommandStack.js';
import { SelectionManager } from '../selection/SelectionManager.js';
import { PerformanceManager } from '../performance/PerformanceManager.js';
export function createAppState(){ const document=new DocumentState(); return {document, commands:new CommandStack(), selection:new SelectionManager(document), performance:new PerformanceManager()}; }
