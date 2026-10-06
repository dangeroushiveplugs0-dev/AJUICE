export class PerformanceManager {
  constructor(){ this.frameMs=0; this.gpuTier='unknown'; this.settings={pixelRatio:Math.min(devicePixelRatio,2), shadows:true, textureScale:1, physicsRate:60}; }
  update(deltaMs){ this.frameMs=this.frameMs*.9+deltaMs*.1; }
  getViewportPolicy(){ if(this.frameMs>30) return {pixelRatio:.75,shadows:false,textureScale:.75,physicsRate:30}; if(this.frameMs>22) return {pixelRatio:1,shadows:false,textureScale:.85,physicsRate:45}; return {pixelRatio:Math.min(devicePixelRatio,2),shadows:true,textureScale:1,physicsRate:60}; }
}
