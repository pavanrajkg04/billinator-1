import {Fragment,useCallback,useContext,useEffect} from "react"
import {Badge as RadixThemesBadge,Box as RadixThemesBox,Button as RadixThemesButton,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Separator as RadixThemesSeparator,Spinner as RadixThemesSpinner,Table as RadixThemesTable,Text as RadixThemesText} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {BarChart as LucideBarChart,DollarSign as LucideDollarSign,Home as LucideHome,Package as LucidePackage,Receipt as LucideReceipt,Settings as LucideSettings,ShoppingCart as LucideShoppingCart,Truck as LucideTruck,UserCog as LucideUserCog,Users as LucideUsers,Warehouse as LucideWarehouse} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isTrue} from "$/utils/state"
import {jsx} from "@emotion/react"




function Button_a2101e500f5434992cb5e632d982ab6d () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_e529414f282ca47260b999828e1322d8 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___stocks____stock_state.refresh_stocks", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["icon"] : "refresh-cw" }),onClick:on_click_e529414f282ca47260b999828e1322d8,variant:"outline"},"Refresh")
  )
}


function Table__body_417df1e14bf241751ad8e7424a017f30 () {
  const reflex___state____state__state____global_state__pages___stocks____stock_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___stocks____stock_state)



  return (
    jsx(RadixThemesTable.Body,{},Array.prototype.map.call(reflex___state____state__state____global_state__pages___stocks____stock_state.product_indices_rx_state_ ?? [],((idx_rx_state_,index_b0e621e2827fa8872d79db478654a88d)=>(jsx(RadixThemesTable.Row,{key:index_b0e621e2827fa8872d79db478654a88d},jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___stocks____stock_state.product_names_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___stocks____stock_state.product_skus_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},jsx(Fragment,{},(((reflex___state____state__state____global_state__pages___stocks____stock_state.product_stocks_rx_state_?.at?.(idx_rx_state_) <= reflex___state____state__state____global_state__pages___stocks____stock_state.product_reorder_levels_rx_state_?.at?.(idx_rx_state_)) && (reflex___state____state__state____global_state__pages___stocks____stock_state.product_reorder_levels_rx_state_?.at?.(idx_rx_state_) > 0))?(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "red.600" }),weight:"bold"},((reflex___state____state__state____global_state__pages___stocks____stock_state.product_stocks_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ""))+" "+reflex___state____state__state____global_state__pages___stocks____stock_state.product_units_rx_state_?.at?.(idx_rx_state_))))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p"},((reflex___state____state__state____global_state__pages___stocks____stock_state.product_stocks_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ""))+" "+reflex___state____state__state____global_state__pages___stocks____stock_state.product_units_rx_state_?.at?.(idx_rx_state_)))))))),jsx(RadixThemesTable.Cell,{},((reflex___state____state__state____global_state__pages___stocks____stock_state.product_reorder_levels_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ""))+" "+reflex___state____state__state____global_state__pages___stocks____stock_state.product_units_rx_state_?.at?.(idx_rx_state_))),jsx(RadixThemesTable.Cell,{},jsx(Fragment,{},(((reflex___state____state__state____global_state__pages___stocks____stock_state.product_stocks_rx_state_?.at?.(idx_rx_state_) <= reflex___state____state__state____global_state__pages___stocks____stock_state.product_reorder_levels_rx_state_?.at?.(idx_rx_state_)) && (reflex___state____state__state____global_state__pages___stocks____stock_state.product_reorder_levels_rx_state_?.at?.(idx_rx_state_) > 0))?(jsx(Fragment,{},jsx(RadixThemesBadge,{color:"red"},"Low Stock"))):(jsx(Fragment,{},jsx(RadixThemesBadge,{color:"green"},"In Stock")))))))))))
  )
}


function Fragment_01bf75f918b68b2ca21c259f0d609856 () {
  const reflex___state____state__state____global_state__pages___stocks____stock_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___stocks____stock_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___stocks____stock_state.product_indices_rx_state_.length > 0)?(jsx(Fragment,{},jsx(RadixThemesTable.Root,{css:({ ["width"] : "100%" })},jsx(RadixThemesTable.Header,{},jsx(RadixThemesTable.Row,{},jsx(RadixThemesTable.ColumnHeaderCell,{},"Product"),jsx(RadixThemesTable.ColumnHeaderCell,{},"SKU"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Current Stock"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Reorder Level"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Status"))),jsx(Table__body_417df1e14bf241751ad8e7424a017f30,{},)))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["padding"] : "4" })},"No products found.")))))
  )
}


function Fragment_8611f68b46ee8e7bf7746dc59b54fd8d () {
  const reflex___state____state__state____global_state__pages___stocks____stock_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___stocks____stock_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___stocks____stock_state.is_loading_rx_state_?(jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["padding"] : "8" })},jsx(RadixThemesSpinner,{},)))):(jsx(Fragment_01bf75f918b68b2ca21c259f0d609856,{},))))
  )
}


function Table__body_a6145fe692cfd1701aa8c6c97af0e98c () {
  const reflex___state____state__state____global_state__pages___stocks____stock_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___stocks____stock_state)



  return (
    jsx(RadixThemesTable.Body,{},Array.prototype.map.call(reflex___state____state__state____global_state__pages___stocks____stock_state.transaction_indices_rx_state_ ?? [],((idx_rx_state_,index_5d263467f956e3fc0d5387fde324757b)=>(jsx(RadixThemesTable.Row,{key:index_5d263467f956e3fc0d5387fde324757b},jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___stocks____stock_state.transaction_dates_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___stocks____stock_state.product_names_tx_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___stocks____stock_state.transaction_types_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},jsx(Fragment,{},((reflex___state____state__state____global_state__pages___stocks____stock_state.transaction_types_rx_state_?.at?.(idx_rx_state_)?.valueOf?.() === "SALE"?.valueOf?.())?(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "red.600" })},("-"+(reflex___state____state__state____global_state__pages___stocks____stock_state.quantities_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', "")))))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "green.600" })},("+"+(reflex___state____state__state____global_state__pages___stocks____stock_state.quantities_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ""))))))))))))))
  )
}


function Fragment_e8405f3b5a7b7f9004404b6eedcddee7 () {
  const reflex___state____state__state____global_state__pages___stocks____stock_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___stocks____stock_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___stocks____stock_state.transaction_indices_rx_state_.length > 0)?(jsx(Fragment,{},jsx(RadixThemesTable.Root,{css:({ ["width"] : "100%" })},jsx(RadixThemesTable.Header,{},jsx(RadixThemesTable.Row,{},jsx(RadixThemesTable.ColumnHeaderCell,{},"Date"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Product"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Type"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Quantity"))),jsx(Table__body_a6145fe692cfd1701aa8c6c97af0e98c,{},)))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["padding"] : "4" })},"No transactions found.")))))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100vh" }),direction:"row",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "250px", ["height"] : "100vh", ["padding"] : "4", ["background"] : "gray.50", ["borderRight"] : "1px solid", ["borderColor"] : "gray.200" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["padding"] : "4" }),size:"6"},"Billinator"),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "2" }),direction:"column",gap:"2"},jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/dashboard"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideHome,{size:20},),jsx(RadixThemesText,{as:"p"},"Dashboard")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/products"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucidePackage,{size:20},),jsx(RadixThemesText,{as:"p"},"Products")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/customers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUsers,{size:20},),jsx(RadixThemesText,{as:"p"},"Customers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/suppliers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideTruck,{size:20},),jsx(RadixThemesText,{as:"p"},"Suppliers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/purchases"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideShoppingCart,{size:20},),jsx(RadixThemesText,{as:"p"},"Purchases")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/sales"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideReceipt,{size:20},),jsx(RadixThemesText,{as:"p"},"Sales")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/stocks"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideWarehouse,{size:20},),jsx(RadixThemesText,{as:"p"},"Stocks")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/outstanding"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideDollarSign,{size:20},),jsx(RadixThemesText,{as:"p"},"Outstanding")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/reports"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideBarChart,{size:20},),jsx(RadixThemesText,{as:"p"},"Reports")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/users"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUserCog,{size:20},),jsx(RadixThemesText,{as:"p"},"Users & Roles")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/settings"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideSettings,{size:20},),jsx(RadixThemesText,{as:"p"},"Settings"))))))),jsx(RadixThemesBox,{css:({ ["flex"] : "1", ["padding"] : "6", ["overflowY"] : "auto", ["height"] : "100vh" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "4" }),direction:"row",gap:"3"},jsx(RadixThemesHeading,{size:"9",weight:"bold"},"Stock Management"),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(Button_a2101e500f5434992cb5e632d982ab6d,{},)),jsx(RadixThemesHeading,{css:({ ["marginBottom"] : "2" }),size:"6"},"Current Stock Levels"),jsx(Fragment_8611f68b46ee8e7bf7746dc59b54fd8d,{},),jsx(RadixThemesHeading,{css:({ ["marginTop"] : "6", ["marginBottom"] : "2" }),size:"6"},"Recent Stock Transactions"),jsx(Fragment_e8405f3b5a7b7f9004404b6eedcddee7,{},)))),jsx("title",{},"Stocks - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}