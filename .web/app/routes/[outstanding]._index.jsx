import {Fragment,useCallback,useContext,useEffect} from "react"
import {Box as RadixThemesBox,Button as RadixThemesButton,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Separator as RadixThemesSeparator,Table as RadixThemesTable,Text as RadixThemesText} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {BarChart as LucideBarChart,DollarSign as LucideDollarSign,Home as LucideHome,Package as LucidePackage,Receipt as LucideReceipt,Settings as LucideSettings,ShoppingCart as LucideShoppingCart,Truck as LucideTruck,UserCog as LucideUserCog,Users as LucideUsers,Warehouse as LucideWarehouse} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isTrue} from "$/utils/state"
import {jsx} from "@emotion/react"




function Button_554737fdfb3c956da3e5fa865a320906 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_7abfc399d0a21c08c8c18499f62b990b = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___outstanding____outstanding_state.refresh_outstanding", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["icon"] : "refresh-cw" }),onClick:on_click_7abfc399d0a21c08c8c18499f62b990b,variant:"outline"},"Refresh")
  )
}


function Heading_c0cfe59d60fe31508296e6aec042cd48 () {
  const reflex___state____state__state____global_state__pages___outstanding____outstanding_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___outstanding____outstanding_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "orange.600" }),size:"8"},("\u20b9 "+(reflex___state____state__state____global_state__pages___outstanding____outstanding_state.total_receivables_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Heading_7840a05e213b594bf70905d7e83f703d () {
  const reflex___state____state__state____global_state__pages___outstanding____outstanding_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___outstanding____outstanding_state)



  return (
    jsx(RadixThemesHeading,{css:({ ["color"] : "red.600" }),size:"8"},("\u20b9 "+(reflex___state____state__state____global_state__pages___outstanding____outstanding_state.total_payables_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Table__body_c058ce34b2844ee0eee5d6a172937140 () {
  const reflex___state____state__state____global_state__pages___outstanding____outstanding_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___outstanding____outstanding_state)



  return (
    jsx(RadixThemesTable.Body,{},Array.prototype.map.call(reflex___state____state__state____global_state__pages___outstanding____outstanding_state.receivables_indices_rx_state_ ?? [],((idx_rx_state_,index_c32b25efea492675fce938ff47949a41)=>(jsx(RadixThemesTable.Row,{key:index_c32b25efea492675fce938ff47949a41},jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___outstanding____outstanding_state.receivables_customer_names_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "orange.600" }),weight:"bold"},("\u20b9 "+(reflex___state____state__state____global_state__pages___outstanding____outstanding_state.receivables_amounts_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))))))))
  )
}


function Fragment_b0d5b7e073f790c1b2777ac69b85e7d2 () {
  const reflex___state____state__state____global_state__pages___outstanding____outstanding_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___outstanding____outstanding_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___outstanding____outstanding_state.receivables_indices_rx_state_.length > 0)?(jsx(Fragment,{},jsx(RadixThemesTable.Root,{css:({ ["width"] : "100%" })},jsx(RadixThemesTable.Header,{},jsx(RadixThemesTable.Row,{},jsx(RadixThemesTable.ColumnHeaderCell,{},"Customer"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Outstanding Amount"))),jsx(Table__body_c058ce34b2844ee0eee5d6a172937140,{},)))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["padding"] : "4" })},"No receivables found.")))))
  )
}


function Table__body_f0cc35b17b683c7853a996b1fbc2e1fa () {
  const reflex___state____state__state____global_state__pages___outstanding____outstanding_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___outstanding____outstanding_state)



  return (
    jsx(RadixThemesTable.Body,{},Array.prototype.map.call(reflex___state____state__state____global_state__pages___outstanding____outstanding_state.payables_indices_rx_state_ ?? [],((idx_rx_state_,index_c32b25efea492675fce938ff47949a41)=>(jsx(RadixThemesTable.Row,{key:index_c32b25efea492675fce938ff47949a41},jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___outstanding____outstanding_state.payables_supplier_names_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "red.600" }),weight:"bold"},("\u20b9 "+(reflex___state____state__state____global_state__pages___outstanding____outstanding_state.payables_amounts_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))))))))
  )
}


function Fragment_19ad8ad167f547b365338163b651b35b () {
  const reflex___state____state__state____global_state__pages___outstanding____outstanding_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___outstanding____outstanding_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___outstanding____outstanding_state.payables_indices_rx_state_.length > 0)?(jsx(Fragment,{},jsx(RadixThemesTable.Root,{css:({ ["width"] : "100%" })},jsx(RadixThemesTable.Header,{},jsx(RadixThemesTable.Row,{},jsx(RadixThemesTable.ColumnHeaderCell,{},"Supplier"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Outstanding Amount"))),jsx(Table__body_f0cc35b17b683c7853a996b1fbc2e1fa,{},)))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["padding"] : "4" })},"No payables found.")))))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100vh" }),direction:"row",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "250px", ["height"] : "100vh", ["padding"] : "4", ["background"] : "gray.50", ["borderRight"] : "1px solid", ["borderColor"] : "gray.200" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["padding"] : "4" }),size:"6"},"Billinator"),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "2" }),direction:"column",gap:"2"},jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/dashboard"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideHome,{size:20},),jsx(RadixThemesText,{as:"p"},"Dashboard")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/products"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucidePackage,{size:20},),jsx(RadixThemesText,{as:"p"},"Products")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/customers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUsers,{size:20},),jsx(RadixThemesText,{as:"p"},"Customers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/suppliers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideTruck,{size:20},),jsx(RadixThemesText,{as:"p"},"Suppliers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/purchases"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideShoppingCart,{size:20},),jsx(RadixThemesText,{as:"p"},"Purchases")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/sales"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideReceipt,{size:20},),jsx(RadixThemesText,{as:"p"},"Sales")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/stocks"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideWarehouse,{size:20},),jsx(RadixThemesText,{as:"p"},"Stocks")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/outstanding"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideDollarSign,{size:20},),jsx(RadixThemesText,{as:"p"},"Outstanding")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/reports"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideBarChart,{size:20},),jsx(RadixThemesText,{as:"p"},"Reports")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/users"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUserCog,{size:20},),jsx(RadixThemesText,{as:"p"},"Users & Roles")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/settings"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideSettings,{size:20},),jsx(RadixThemesText,{as:"p"},"Settings"))))))),jsx(RadixThemesBox,{css:({ ["flex"] : "1", ["padding"] : "6", ["overflowY"] : "auto", ["height"] : "100vh" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "4" }),direction:"row",gap:"3"},jsx(RadixThemesHeading,{size:"9",weight:"bold"},"Outstanding Management"),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(Button_554737fdfb3c956da3e5fa865a320906,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "6" }),direction:"row",gap:"4"},jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["border"] : "1px solid", ["borderColor"] : "orange.200", ["borderRadius"] : "lg", ["background"] : "orange.50", ["width"] : "100%" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Total Receivables"),jsx(Heading_c0cfe59d60fe31508296e6aec042cd48,{},))),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["border"] : "1px solid", ["borderColor"] : "red.200", ["borderRadius"] : "lg", ["background"] : "red.50", ["width"] : "100%" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Total Payables"),jsx(Heading_7840a05e213b594bf70905d7e83f703d,{},)))),jsx(RadixThemesHeading,{css:({ ["marginBottom"] : "2" }),size:"6"},"Receivables (Customers)"),jsx(Fragment_b0d5b7e073f790c1b2777ac69b85e7d2,{},),jsx(RadixThemesHeading,{css:({ ["marginTop"] : "6", ["marginBottom"] : "2" }),size:"6"},"Payables (Suppliers)"),jsx(Fragment_19ad8ad167f547b365338163b651b35b,{},)))),jsx("title",{},"Outstanding - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}