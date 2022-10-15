# Property Quick Actions Figma Plugin
Add Object Property Settings to the Quick Actions toolbar for fewer clicks 

(Under Development)

## TODO
Options
- Auto Layout 
  - Spacing between items - number
  - Padding - [Top, Right, Bottom, Left]
  - Alignment - [Top, Right, Bottom, Left, Center]
  - Direction: Vertical ↔ Horizontal
  - Spacing Mode: Packed ↔ Space between
  - Strokes: Included ↔ Excluded
  - Canvas Stacking: First ↔ Last
  - Text Baseline Alignment: On ↔ Off
  --- ...done
- Frame
  - position x,y - [number, number]
  - size height,width - [number, number]
  - rotation - number
  - Corner Radius - [number, ...]
  - Clip Content - boolean
  - Horizontal/Vertical Resizing - [Fixed, Hug, Fill]
  - Constrain Proportions - boolean
  - Absolute Position - boolean
  - ?? Spacing Between Items - number - the API does not provide this
- Constraints
  - Vertical/Horizontal - [Left, Right, Stretch, Center, Scale]
  - Fix position when scrolling - boolean
- Overflow Scrolling - [Horizontal, Vertical, Both, None]
- Fill
  - ? Set style - Select Color Style
- Layer
  - Blend mode  - [BlendMode... ]
- Stroke    
  - ? Set style - Select Color Style
  - Stroke align: [Center, Inside, Outside]
  - Stroke weight - [number, ...]
  - Strokes per side - [Top, Right, Bottom, Left, All]
  - Stroke style - [Solid, Dash]
  - Dashes - [number, ...]
  - Dash cap - [None, Square, Round]
  - Join - [Mitre, Bevel, Round]
  - Endpoints - [StrokeCap, ConnectorStrokeCap]
  - Startpoint - [StrokeCap, ConnectorStrokeCap]
  - Endpoint - [StrokeCap, ConnectorStrokeCap]
  - Swap start and endpoint - toggle
- Text
  - Resizing - [Auto, Auto height, Fixed size, Truncate text]
  - (most common text operations have a command or key already)
  - (uncommon text operations are not worth adding)
- Image
  - Scale Mode - [Fill, Fit, Crop, Tile] [scaleMode... ]

- Polygon/Star
  - Count - number ()
  - Ratio - angle
- Ellipse
  - Arc...