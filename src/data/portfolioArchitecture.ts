/**
 * Project 01 is a CONCEPTUAL apartment (~9.80 x 7.40 m outside footprint).
 * Architectural scheme for illustrating a future renovation, not a measured survey,
 * permit drawing, as-built plan, or proof of a completed Renovivo commission.
 *
 * One shared coordinate system (x, z, meters) powers both the plan and walkthrough.
 * Partition openings are true 90–95 cm gaps; there are no hidden colliders at doors.
 */
export type Point2 = readonly [number, number];
export type WalkZoneId = "living" | "kitchen" | "bedroom" | "bathroom" | "hall" | "utility";
export type WallKind = "partition" | "perimeter" | "window" | "entry" | "bath";
export interface WallSegment {
  a: Point2;
  b: Point2;
  kind: WallKind;
}
export type WalkZone = {
  id: WalkZoneId;
  nameBg: string;
  nameEn: string;
  label: string;
  area: string;
  bounds: { x: number; z: number; w: number; h: number };
  entry: { x: number; z: number; angle: number };
};
const wall=(x1:number,z1:number,x2:number,z2:number,kind:WallKind="partition"):WallSegment=>({
  a:[x1,z1],b:[x2,z2],kind,
});
export const footprint = {width:9.8, depth:7.4, ceilingHeight:2.65, approximateArea:72.52};
export const wallSegments:WallSegment[] = [
  // Facades: glazing is represented as colored panes with collision, not a hole in the exterior wall.
  wall(0,0,0.7,0,"perimeter"),
  wall(0.7,0,3.25,0,"window"),
  wall(3.25,0,6.35,0,"perimeter"),
  wall(6.35,0,9.1,0,"window"),
  wall(9.1,0,9.8,0,"perimeter"),
  wall(0,0,0,5.55,"perimeter"),
  wall(0,5.55,0,6.95,"window"),
  wall(0,6.95,0,7.4,"perimeter"),
  wall(9.8,0,9.8,7.4,"perimeter"),
  wall(0,7.4,4.4,7.4,"perimeter"),
  wall(4.4,7.4,5.35,7.4,"entry"),
  wall(5.35,7.4,9.8,7.4,"perimeter"),

  // A genuine open doorway on the left of hall (z = 3.20..4.15).
  wall(4.1,0,4.1,3.20),
  wall(4.1,4.15,4.1,7.4),
  // Bedroom door (z = 2.35..3.25) and bathroom door (z = 5.15..6.10).
  wall(5.6,0,5.6,2.35),
  wall(5.6,3.25,5.6,5.15),
  wall(5.6,6.10,5.6,7.4),
  // Bedroom/bathroom horizontal partition.
  wall(5.6,4.3,9.8,4.3,"partition"),
  // A real 90 cm opening connects bathroom to the utility cupboard.
  wall(8.35,4.3,8.35,5.45,"partition"),
  wall(8.35,6.35,8.35,7.4,"partition"),
];
export const rooms: WalkZone[] = [
  {
    id:"living", nameBg:"Дневна", nameEn:"Living room", label:"ДНЕВНА", area:"~21 м²",
    bounds:{x:0,z:0,w:4.1,h:5.1},
    entry:{x:2.6,z:3.4,angle:-2.0},
  },
  {
    id:"kitchen", nameBg:"Кухня и трапезария", nameEn:"Kitchen & dining", label:"КУХНЯ / ТРАПЕЗАРИЯ", area:"~9 м²",
    bounds:{x:0,z:5.1,w:4.1,h:2.3},
    entry:{x:2.6,z:5.8,angle:2.4},
  },
  {
    id:"bedroom", nameBg:"Спалня", nameEn:"Bedroom", label:"СПАЛНЯ", area:"~18 м²",
    bounds:{x:5.6,z:0,w:4.2,h:4.3},
    entry:{x:7.1,z:2.5,angle:-1.5},
  },
  {
    id:"bathroom", nameBg:"Баня", nameEn:"Bathroom", label:"БАНЯ", area:"~8.5 м²",
    bounds:{x:5.6,z:4.3,w:2.75,h:3.1},
    entry:{x:6.5,z:5.75,angle:-0.7},
  },
  {
    id:"hall", nameBg:"Антре и коридор", nameEn:"Entrance & hall", label:"АНТРЕ / КОРИДОР", area:"~11 м²",
    bounds:{x:4.1,z:0,w:1.5,h:7.4},
    entry:{x:4.85,z:6.55,angle:-Math.PI/2},
  },
  {
    id:"utility", nameBg:"Склад / техническа ниша", nameEn:"Utility cupboard", label:"СКЛАД", area:"~4.5 м²",
    bounds:{x:8.35,z:4.3,w:1.45,h:3.1},
    entry:{x:8.9,z:5.5,angle:-Math.PI/2},
  },
];
export const getZone=(x:number,z:number):WalkZoneId=>{
  if(x<4.1) return z>5.1?"kitchen":"living";
  if(x<5.6)return "hall";
  if(z<4.3)return "bedroom";
  if(x<8.35)return "bathroom";
  return "utility";
};
export const distanceToWall=(x:number,z:number,w:WallSegment)=>{
  const dx=w.b[0]-w.a[0], dz=w.b[1]-w.a[1];
  const len2=dx*dx+dz*dz;
  const t=Math.max(0,Math.min(1,((x-w.a[0])*dx+(z-w.a[1])*dz)/len2));
  return Math.hypot(x-(w.a[0]+t*dx),z-(w.a[1]+t*dz));
};
export const canWalkTo=(x:number,z:number,radius=.18)=>{
  if(x<radius||z<radius||x>footprint.width-radius||z>footprint.depth-radius)return false;
  return wallSegments.every(w=>distanceToWall(x,z,w)>=radius);
};
