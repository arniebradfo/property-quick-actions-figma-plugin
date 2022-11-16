# Property Quick Actions Figma Plugin
Add Object Property Settings to the Quick Actions toolbar for fewer clicks 

(Under Development)

## Input Strategy
- (Currently) all as menu items with 1 level of hierarchy
- As two-stage quick actions under 1 level of hierarchy
- as two-stage quick actions under no hierarchy - type cmd/ QA Enter then fuzzy find the command
  - this will help with namespacing against all other plugins
  - Also, this will allow adding a ui for customization?

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
- Layer
  - Blend mode  - [BlendMode... ]
- Set Style
  - Fill
  - Stroke
  - Text
  - Effect
  - Grid
  - Any
- Stroke    
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


BUGS:
- rotate doesn't work when a node has been flipped one way